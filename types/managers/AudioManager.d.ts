import Manager from '../core/Manager';
import { Howl } from 'howler';
export default class AudioManager extends Manager {
    protected _tracks: IAudioTrack[];
    get tracks(): IAudioTrack[];
    set volume(value: number);
    addTrack(name: string, options: any): IAudioTrack;
    getTrack(name: string): IAudioTrack;
    getTrackIndex(name: string): number;
    removeTrack(name: string): void;
    renameTrack(currentName: string, name: string): void;
}
export interface IAudioTrack {
    name: string;
    audio: Howl;
}
