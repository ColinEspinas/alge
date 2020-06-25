import Manager from '../core/Manager';
import {Howl, Howler} from 'howler';

export default class AudioManager extends Manager{

	protected _tracks : IAudioTrack[] = [];

	public get tracks() { return this._tracks; }
	public set volume(value : number) { Howler.volume(value); }

	public addTrack(name : string, options) : IAudioTrack {
		options = options || {};
		this._tracks.push({
			name: name,
			audio: new Howl(options),
		});
		return this._tracks[this._tracks.length - 1];
	}

	public getTrack(name : string) : IAudioTrack {
		for(let i = 0, len = this._tracks.length; i < len; ++i) {
			if (this._tracks[i].name === name) {
				return this._tracks[i];
			}
		}
		return null;
	}

	public getTrackIndex(name : string) : number {
		for(let i = 0, len = this._tracks.length; i < len; ++i) {
			if (this._tracks[i].name === name) {
				return i;
			}
		}
		return null;
	}

	public removeTrack(name : string) {
		for (var i = 0, len = this._tracks.length; i < len; i++) {
			if (this._tracks[i].name === name) {
				this._tracks.splice(i, 1);
			}
		}
	}

	public renameTrack(currentName : string, name : string) {
		this.getTrack(currentName).name = name;
	}
}

export interface IAudioTrack {
	name : string;
	audio : Howl;
}