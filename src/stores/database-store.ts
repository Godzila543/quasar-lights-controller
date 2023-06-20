import { defineStore } from 'pinia';
import { Palette } from 'src/components/palette';
import { Generator } from 'src/components/generator';
import { Settings } from 'src/components/settingsUI';
import { useRouter } from 'vue-router';
import { Notify } from 'quasar';

import db from 'src/stores/supa';

export const useDatabase = defineStore('database', {
  state: () => ({
    router: useRouter(),
    palettes: [] as Palette[],
    activePalette: null as Palette | null,
    editedPalette: { name: '', colors: ['#00ffaa', '#5555ff'] } as Palette,
    oldEditedPaletteName: '',
    freshPalette: true,

    generators: [] as Generator[],
    activeGenerator: null as Generator | null,
    editedGenerator: {
      name: '',
      type: 'gradient',

      speed: 1,
      density: 1,

      particleCount: 1,
      particleLifetime: 1,
      particleSize: 1,
      particleSharpness: 1,
      persistence: 1,
      colorMethod: 'random',
      intensityMethod: 'fade-in',
      pulseCount: 1,
      initialPositionMethod: 'set',
      initialPosition: { min: 1, max: 2 },
      initialVelocityMethod: 'set',
      initialVelocity: { min: 1, max: 2 },
      calculatedAttribute: 'position',
      calculationMethod: 'constant',
      calculatedAttributeParams: [1, 0, 0],
    } as Generator,
    oldEditedGeneratorName: '',
    freshGenerator: true,

    settings: {
      brightness: 100,
      speed: 1,
      theme: 'Active Palette',
    } as Settings,
  }),
  getters: {
    activePaletteColors: (state) => {
      if (state.activePalette) {
        return state.activePalette.colors;
      }
      return [];
    },
    headerTextColor: (state) => {
      if (state.settings.theme === 'Light') {
        return 'black';
      } else if (state.settings.theme === 'Dark') {
        return 'white';
      } else if (state.settings.theme === 'Active Palette') {
        if (state.activePalette) {
          //find the darkest color in the active palette
        }
        return 'black';
      }
    },
  },
  actions: {
    async fetchDB() {
      const { data, error } = await db.from('palettes').select('colors, name');
      if (error) {
        console.error(error);
      } else {
        this.palettes = data as Palette[];
      }

      const { data: data2, error: error2 } = await db
        .from('generators')
        .select('config');
      if (error2) {
        console.error(error2);
      } else {
        this.generators = [];
        data2.forEach((d) => {
          this.generators.push(d.config);
        });
      }
    },

    newPalette() {
      this.freshPalette = true;
      this.editedPalette = { name: '', colors: ['#00ffaa', '#5555ff'] };
      this.router.push('/palettes/edit');
    },

    editPalette(palette: Palette) {
      const index = this.palettes.findIndex((p) => p.name === palette.name);
      if (index >= 0) {
        this.freshPalette = false;
        this.editedPalette = {
          name: palette.name,
          colors: palette.colors.slice(),
        };
        this.oldEditedPaletteName = palette.name;
        this.router.push('/palettes/edit');
      }
    },

    copyPalette(palette: Palette) {
      let i = 1;
      while (this.palettes.find((p) => p.name === palette.name + ` (${i})`)) {
        i++;
      }

      this.createPalette({
        name: palette.name + ` (${i})`,
        colors: palette.colors.slice(),
      });
    },

    async createPalette(palette: Palette) {
      if (this.palettes.find((p) => p.name === palette.name)) {
        Notify.create({
          message: 'A palette with that name already exists.',
          color: 'negative',
          position: 'top',
          timeout: 2000,
        });
        return false;
      }
      if (palette.name === '') {
        return false;
      }

      const { error } = await db
        .from('palettes')
        .insert([{ name: palette.name, colors: palette.colors }]);

      if (error) {
        console.error(error);
      } else {
        this.router.replace('/palettes');
        this.palettes.push(palette);
        return true;
      }
    },

    async updatePalette(palette: Palette) {
      const index = this.palettes.findIndex(
        (p) => p.name === this.oldEditedPaletteName
      );
      if (index >= 0) {
        this.palettes[index] = {
          name: palette.name,
          colors: palette.colors.slice(),
        };
        const { error } = await db
          .from('palettes')
          .update([{ name: palette.name, colors: palette.colors }])
          .eq('name', this.oldEditedPaletteName);

        if (error) {
          console.error(error);
        }
        this.router.back();
      }
    },

    async deletePalette(paletteName: string) {
      const index = this.palettes.findIndex(
        (palette) => palette.name === paletteName
      );

      if (index >= 0) {
        this.palettes.splice(index, 1);
        const { error } = await db
          .from('palettes')
          .delete()
          .eq('name', paletteName);

        if (error) console.error(error);
        this.router.back();
      }
    },

    setActivePalette(palette: Palette) {
      this.activePalette = palette;
    },

    // GENERATOR SECTION

    newGradient() {
      this.freshGenerator = true;
      this.editedGenerator = {
        name: '',
        type: 'gradient',

        speed: 1,
        density: 1,

        particleCount: 1,
        particleLifetime: 1,
        particleSize: 1,
        particleSharpness: 1,
        persistence: 1,
        colorMethod: 'random',
        intensityMethod: 'fade-in',
        pulseCount: 1,
        initialPositionMethod: 'set',
        initialPosition: { min: 1, max: 2 },
        initialVelocityMethod: 'set',
        initialVelocity: { min: 1, max: 2 },
        calculatedAttribute: 'position',
        calculationMethod: 'constant',
        calculatedAttributeParams: [1, 0, 0],
      };
      this.router.push('/generators/edit');
    },

    newParticle() {
      this.freshGenerator = true;
      this.editedGenerator = {
        name: '',
        type: 'particle',

        speed: 1,
        density: 1,

        particleCount: 10,
        particleLifetime: 1,
        particleSize: 15,
        particleSharpness: 1,
        persistence: 0,
        colorMethod: 'influence',
        intensityMethod: 'fade-in-out',
        pulseCount: 1,
        initialPositionMethod: 'range',
        initialPosition: { min: 0, max: 900 },
        initialVelocityMethod: 'set',
        initialVelocity: { min: 0, max: 0 },
        calculatedAttribute: 'position',
        calculationMethod: 'constant',
        calculatedAttributeParams: [1, 0, 0],
      };
      this.router.push('/generators/edit');
    },

    setActiveGenerator(generator: Generator) {
      this.activeGenerator = generator;
    },

    async copyGenerator(generator: Generator) {
      let i = 1;
      while (
        this.generators.find((g) => g.name === generator.name + ` (${i})`)
      ) {
        i++;
      }

      this.createGenerator({ ...generator, name: generator.name + ` (${i})` });
    },

    async createGenerator(generator: Generator) {
      if (this.generators.find((g) => g.name === generator.name)) {
        Notify.create({
          message: 'A generator with that name already exists.',
          color: 'negative',
          position: 'top',
          timeout: 2000,
        });
        return false;
      }
      if (generator.name === '') {
        return false;
      }

      const { error } = await db
        .from('generators')
        .insert([{ name: generator.name, config: generator }]);

      if (error) {
        console.error(error);
      } else {
        this.router.replace('/generators');
        this.generators.push(JSON.parse(JSON.stringify(generator)));
        return true;
      }
    },

    async updateGenerator(generator: Generator) {
      const index = this.generators.findIndex(
        (g) => g.name === this.oldEditedGeneratorName
      );
      if (index >= 0) {
        this.generators[index] = JSON.parse(JSON.stringify(generator));
        const { error } = await db
          .from('generators')
          .update([{ name: generator.name, config: generator }])
          .eq('name', this.oldEditedGeneratorName);

        if (error) {
          console.error(error);
        }
        this.router.back();
      }
    },

    editGenerator(generator: Generator) {
      this.freshGenerator = false;
      this.editedGenerator = JSON.parse(JSON.stringify(generator));
      this.oldEditedGeneratorName = generator.name;
      this.router.push('/generators/edit');
    },

    async deleteGenerator(generatorName: string) {
      const index = this.generators.findIndex(
        (generator) => generator.name === generatorName
      );

      if (index >= 0) {
        this.generators.splice(index, 1);
        const { error } = await db
          .from('generators')
          .delete()
          .eq('name', generatorName);

        if (error) console.error(error);
        this.router.back();
      }
    },
  },
});
