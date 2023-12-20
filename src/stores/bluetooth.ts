import { defineStore } from 'pinia';
import { Palette } from 'src/ts/palette';
import { Generator } from 'src/ts/generator';

import { Notify } from 'quasar';
const enc = new TextEncoder();

const LED_SERVICE = 'c17378c5-b652-4e4b-9b53-45222f86e4d6';
const LED_GENERATOR_CHARACTERISTIC = 0x6eee;
const LED_PALETTE_CHARACTERISTIC = 0x9a11;
const LED_BRIGHTNESS_CHARACTERISTIC = 0xb177;

const convertToRGB = function (hexString: string) {
  if (hexString.length != 7) {
    throw 'Only six-digit hex colors are allowed.';
  }

  hexString = hexString.substring(1);
  const aRgbHex = hexString.match(/.{1,2}/g);
  const aRgb = [
    parseInt(aRgbHex[0], 16),
    parseInt(aRgbHex[1], 16),
    parseInt(aRgbHex[2], 16),
  ];

  return aRgb;
};

const sliderToSpeed = function (value: number) {
  return Math.pow(value / 15, 3);
};
const sliderToDensity = function (value: number) {
  return Math.pow(value / 3, 3);
};

export const useBluetooth = defineStore('bluetooth', {
  state: () => ({
    connected: false,
    dialog: true,
    BLE: {
      device: {} as BluetoothDevice | undefined,
      server: {} as BluetoothRemoteGATTServer | undefined,
      service: {} as BluetoothRemoteGATTService | undefined,
      generatorCharicteristic: {} as
        | BluetoothRemoteGATTCharacteristic
        | undefined,
      paletteCharicteristic: {} as
        | BluetoothRemoteGATTCharacteristic
        | undefined,
      brightnessCharicteristic: {} as
        | BluetoothRemoteGATTCharacteristic
        | undefined,
    },
  }),
  getters: {
    isConnected: (state) => state.connected,
  },
  actions: {
    async initBluetooth() {
      try {
        this.BLE.device = await navigator.bluetooth.requestDevice({
          filters: [
            {
              name: 'NimBLE-Arduino',
              services: [LED_SERVICE],
            },
          ],
        });

        Notify.create({
          message: 'Connected to ' + this.BLE.device.name,
          color: 'green',
          position: 'top',
        });

        this.BLE.device.addEventListener('gattserverdisconnected', () => {
          this.connected = false;
        });

        console.log('Connecting to GATT server');
        this.BLE.server = await this.BLE.device.gatt?.connect();

        Notify.create({
          message: 'Connected to GATT server' + String(this.BLE.server),
          color: 'green',
          position: 'top',
        });

        console.log('Getting service');
        this.BLE.service = await this.BLE.server?.getPrimaryService(
          LED_SERVICE
        );

        Notify.create({
          message: 'Connected to Service' + String(this.BLE.service),
          color: 'green',
          position: 'top',
        });

        console.log('Getting Generator characteristic');
        this.BLE.generatorCharicteristic =
          await this.BLE.service?.getCharacteristic(
            LED_GENERATOR_CHARACTERISTIC
          );

        console.log('Getting Palette characteristic');
        this.BLE.paletteCharicteristic =
          await this.BLE.service?.getCharacteristic(LED_PALETTE_CHARACTERISTIC);

        console.log('Getting Brightness characteristic');
        this.BLE.brightnessCharicteristic =
          await this.BLE.service?.getCharacteristic(
            LED_BRIGHTNESS_CHARACTERISTIC
          );

        Notify.create({
          message:
            'Connected to Characteristics ' +
            String(this.BLE.brightnessCharicteristic),
          color: 'green',
          position: 'top',
        });

        this.connected = true;
        this.dialog = false;
      } catch (error) {
        Notify.create({
          message: 'Bluetooth init failed ' + error,
          color: 'red',
          position: 'top',
        });
        this.connected = false;
      }
    },

    onDisconnect(deviceID: string) {
      console.log(`device ${deviceID} disconnected`);
      this.connected = false;
    },

    sendBrightness(brightness: number) {
      if (this.BLE.brightnessCharicteristic) {
        const promise =
          this.BLE.brightnessCharicteristic.writeValueWithResponse(
            enc.encode('{brightness: ' + brightness + '}')
          );
        promise.then(() => {
          console.log('Brightness sent');
          Notify.create({
            message: 'Sent Brightness',
            color: 'green',
            position: 'top',
          });
        });
        promise.catch((error) => {
          console.error('Brightness send failed', error);
          Notify.create({
            message: 'promise failed ' + String(error),
            color: 'red',
            position: 'top',
          });
        });
      } else {
        console.error('No device connected: Couldnt send Brightness');
        Notify.create({
          message: 'No brightness connection: Couldnt send Brightness',
          color: 'red',
          position: 'top',
        });
      }
    },

    sendPalette(palette: Palette) {
      if (this.BLE.paletteCharicteristic) {
        const preparedPalette = {
          length: palette.colors.length,
          colors: palette.colors.map(convertToRGB),
        };
        this.BLE.paletteCharicteristic.writeValueWithResponse(
          enc.encode(JSON.stringify(preparedPalette))
        );
      } else {
        console.error('No device connected: Couldnt send Palette');
        Notify.create({
          message: 'No palette connection: Couldnt send Palette',
          color: 'red',
          position: 'top',
        });
      }
    },
    sendGenerator(generator: Generator) {
      const pp = {} as any;
      if (generator.type == 'gradient') {
        pp.generator = 0;
        pp.rate = sliderToSpeed(generator.speed);
        pp.density = sliderToDensity(generator.density);
      } else if (generator.type == 'particle') {
        pp.generator = 1;
        pp.timerDecay =
          generator.particleCount / generator.particleLifetime / 100;
        pp.particleDecay = 1 / generator.particleLifetime / 100;
        pp.range = generator.particleSize;
        pp.curveFactor = generator.particleSharpness;
        pp.referenceDecay = Math.pow(generator.persistence, 1.0 / 100.0);

        switch (generator.intensityMethod) {
          case 'fade-out':
            pp.intensityMethod = 0;
            break;
          case 'fade-in':
            pp.intensityMethod = 1;
            break;
          case 'fade-in-out':
            pp.intensityMethod = 2;
            break;
          case 'pulse':
            pp.intensityMethod = 3;
            break;
        }
        pp.intensityValue = generator.pulseCount;

        switch (generator.colorMethod) {
          case 'age':
            pp.colorMethod = 0;
            break;
          case 'intensity':
            pp.colorMethod = 1;
            break;
          case 'influence':
            pp.colorMethod = 2;
            break;
          case 'random':
            pp.colorMethod = 3;
            break;
        }

        switch (generator.initialPositionMethod) {
          case 'set':
            pp.posMethod = 0;
            break;
          case 'range':
            pp.posMethod = 1;
            break;
        }
        pp.posValue1 = generator.initialPosition.min;
        pp.posValue2 = generator.initialPosition.max;

        switch (generator.initialVelocityMethod) {
          case 'set':
            pp.velMethod = 0;
            break;
          case 'range':
            pp.velMethod = 1;
            break;
        }
        pp.velValue1 = generator.initialVelocity.min;
        pp.velValue2 = generator.initialVelocity.max;

        switch (generator.calculatedAttribute) {
          case 'position':
            pp.calculatedAttribute = 0;
            break;
          case 'velocity':
            pp.calculatedAttribute = 1;
            break;
          case 'acceleration':
            pp.calculatedAttribute = 2;
            break;
        }
        switch (generator.calculationMethod) {
          case 'constant':
            pp.attributeMethod = 0;
            pp.aValue1 = generator.calculatedAttributeConstant;
            break;
          case 'scaled-over-life':
            pp.attributeMethod = 1;
            pp.aValue1 = generator.calculatedAttributeRange.min;
            pp.aValue2 = generator.calculatedAttributeRange.max;
            break;
          case 'attractor':
            pp.attributeMethod = 2;
            pp.aValue1 = generator.calculatedAttributeStrength;
            pp.aValue2 = generator.calculatedAttributeValue;
        }
      }
      console.log(JSON.stringify(pp));
      if (this.BLE.generatorCharicteristic) {
        this.BLE.generatorCharicteristic.writeValueWithResponse(
          enc.encode(JSON.stringify(pp))
        );
      } else {
        console.error('No device connected: Couldnt send Generator');
        Notify.create({
          message: 'No device connected: Couldnt send Generator',
          color: 'red',
          position: 'top',
        });
      }
    },
  },
});
