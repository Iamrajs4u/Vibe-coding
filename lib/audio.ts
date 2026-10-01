// Web Audio API ambient soundscape generator for luxury architectural experience
// Generates a soothing 432Hz-based spatial ambient tone and soft breeze filter

class AmbientSoundscape {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private filter: BiquadFilterNode | null = null;

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  public start() {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      this.ctx = new AudioCtx();
      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.045, this.ctx.currentTime + 3);

      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = "lowpass";
      this.filter.frequency.setValueAtTime(320, this.ctx.currentTime);

      // Low soothing drone at 108Hz (harmonic of 432Hz)
      this.osc1 = this.ctx.createOscillator();
      this.osc1.type = "sine";
      this.osc1.frequency.setValueAtTime(108, this.ctx.currentTime);

      // Sub-harmonic warm tone at 216Hz
      this.osc2 = this.ctx.createOscillator();
      this.osc2.type = "sine";
      this.osc2.frequency.setValueAtTime(216, this.ctx.currentTime);

      // Gentle LFO filter modulation for breathing wind effect
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(60, this.ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(this.filter.frequency);
      lfo.start();

      this.osc1.connect(this.filter);
      this.osc2.connect(this.filter);
      this.filter.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);

      this.osc1.start();
      this.osc2.start();
      this.isPlaying = true;
    } catch (e) {
      console.warn("Ambient soundscape could not start:", e);
    }
  }

  public stop() {
    if (!this.ctx || !this.masterGain) return;
    try {
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.5);
      setTimeout(() => {
        this.osc1?.stop();
        this.osc2?.stop();
        this.ctx?.close();
        this.isPlaying = false;
        this.ctx = null;
      }, 1600);
    } catch {
      this.isPlaying = false;
    }
  }
}
let instance: AmbientSoundscape | null = null;

export function getSoundscape(): AmbientSoundscape | null {
  if (typeof window === "undefined") return null;
  if (!instance) {
    instance = new AmbientSoundscape();
  }
  return instance;
}

export const soundscape = typeof window !== "undefined" ? getSoundscape() : null;
