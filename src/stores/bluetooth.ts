import { defineStore } from 'pinia';
import { Palette } from 'src/ts/palette';
import { Generator } from 'src/ts/generator';

import {
  BleClient,
  BleDevice,
  // BleService,
  // BleCharacteristic,
  numbersToDataView,
  textToDataView,
} from '@capacitor-community/bluetooth-le';
import { Notify } from 'quasar';

const LED_SERVICE = 'c17378c5-b652-4e4b-9b53-45222f86e4d6';
const LED_GENERATOR_CHARACTERISTIC = '6eee';
const LED_PALETTE_CHARACTERISTIC = '9a11';
const LED_BRIGHTNESS_CHARACTERISTIC = 'b177';

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

export const useBluetooth = defineStore('bluetooth', {
  state: () => ({
    connected: false,
    dialog: true,
    device: undefined as BleDevice | undefined,
  }),
  getters: {
    isConnected: (state) => state.connected,
  },
  actions: {
    async initBluetooth() {
      try {
        await BleClient.initialize();
        this.device = await BleClient.requestDevice({
          services: [LED_SERVICE],
          // name: 'NimBLE-Arduino',
        });

        console.log('device', this.device);

        await BleClient.connect(this.device.deviceId, this.onDisconnect);
        this.dialog = false;
        this.connected = true;
      } catch (error) {
        console.error('Bluetooth init failed', error);
        this.connected = false;
      }
    },

    onDisconnect(deviceID: string) {
      console.log(`device ${deviceID} disconnected`);
      this.connected = false;
    },

    sendBrightness(brightness: number) {
      if (this.device) {
        BleClient.write(
          this.device.deviceId,
          LED_SERVICE,
          LED_BRIGHTNESS_CHARACTERISTIC,
          numbersToDataView([brightness])
        );
      }
    },

    sendPalette(palette: Palette) {
      if (this.device) {
        const preparedPalette = {
          length: palette.colors.length,
          colors: palette.colors.map(convertToRGB),
        };
        BleClient.write(
          this.device.deviceId,
          LED_SERVICE,
          LED_PALETTE_CHARACTERISTIC,
          textToDataView(JSON.stringify(preparedPalette))
        );
      } else {
        console.error('No device connected: Couldnt send Palette');
        Notify.create({
          message: 'No device connected: Couldnt send Palette',
          color: 'red',
          position: 'top',
        });
      }
    },
    sendGenerator(generator: Generator) {
      if (this.device) {
        BleClient.write(
          this.device.deviceId,
          LED_SERVICE,
          LED_GENERATOR_CHARACTERISTIC,
          numbersToDataView([])
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
