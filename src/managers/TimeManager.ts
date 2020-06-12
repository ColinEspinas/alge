import Engine from "../core/Engine";
import Manager from "../core/Manager";

export default class TimeManager extends Manager {
	
	private _lastUpdate : number;
	private _deltaTime : number;
	private _lastDeltaTime : number;
	private _fps : number;
	private _step : number = 1 / 60;
	private _accumulator : number = 0;
	private frames : number;

	public constructor(engine : Engine, name : string) {
		super(engine, name);
		this._lastUpdate = 0;
		this._deltaTime = 0;
		this._fps = 0;
		this.frames = 0;
	}

	public get deltaTime() : number { return this._deltaTime; }
	public get lastDeltaTime() : number { return this._lastDeltaTime; }
	public get lastUpdate() : number { return this._lastUpdate; }
	public get fps() : number { return this._fps; }
	public get step() : number { return this._step; }
	public get accumulator() : number { return this._accumulator; }

	public Update() {
		this._lastDeltaTime = this._deltaTime;
		this._deltaTime = Math.min(1, (performance.now() - this._lastUpdate)/1000);
		this._accumulator += this.deltaTime;
		this._fps = 1/this._deltaTime;
		++this.frames;
	}

	//Frames Per Second = Num Frame / Elasped Time in Secondsclass CFPS_Counter {private:	DWORD StartTime;	//The Start Time	DWORD CurrTime;		//Current Time	DWORD NumFrame;		//Number of Frames since start	float Fps;			//Current Frames Per Second	float Spf;			//Current Seconds Per Frame	char FPSstring[128];//Dont Overflow<img src="smile.gif" width=15 height=15 align=middle>	unsigned long delay;		public:	int 	StartFPS();			//Starts the FPS Counter	int 	UpdateFPS();	//Updates the Fps Variable	float	ReturnFPS(){return Fps;}	//Returns the Fps variable	int 	DrawFPS();	//Returns the Speed Per Frame from the Num per second	float	NumPerSecond(float in){return in*Spf;}			CFPS_Counter(){}	~CFPS_Counter(){}};//Draws the FPSint CFPS_Counter::DrawFPS(){	if(sprintf(FPSstring,"%f",ReturnFPS())<=0)return FALSE;	Console.Font.glPrint(0,0,FPSstring,1);	return TRUE;}int CFPS_Counter::StartFPS(){	NumFrame=0;	delay=0;	StartTime = GetTickCount();	return TRUE;} int CFPS_Counter::UpdateFPS(){	float tempFPS;	NumFrame++;	CurrTime = GetTickCount();	tempFPS = 1000.0f*((float)NumFrame/((float)CurrTime-(float)StartTime));	Spf = 1/tempFPS;	if(NumFrame>200)StartFPS();		delay++;	if(delay>15)	{		Fps=tempFPS;		delay=0;	}			return TRUE;}    


	public SetLastUpdate() {
		this._lastUpdate = performance.now();
	}

	public FixDelta() {
		this._accumulator -= this._step;
	}
}