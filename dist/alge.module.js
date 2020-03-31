import e from"two.js";import t from"shortid";class s{constructor(){this.id=t.generate(),this.entities=[]}get GetId(){return this.id}Load(){for(var e=0,t=this.entities.length;e<t;e++)this.entities[e].Init()}Unload(){this.entities=[]}Render(){for(var e=0,t=this.entities.length;e<t;e++)this.entities[e].Update()}}class i{constructor(){this.scenes=[]}static get instance(){return i._instance||(i._instance=new i),i._instance}get GetScenes(){return this.scenes}AddScene(e,t){t&&t>=0?this.scenes.splice(t,0,e):this.scenes.push(e)}RemoveScene(e){this.scenes.splice(e,1)}Load(e){this.loadedScene&&this.loadedScene.Unload(),this.loadedScene=this.scenes[e],this.scenes[e].Load()}RenderLoadedScene(){this.loadedScene.Render()}}class n{constructor(){}static get instance(){return n._instance||(n._instance=new n),n._instance}static SetContext(e){n.driver=e}static GetContext(){return n.driver}}class a{constructor(){a.lastUpdate=0,a.deltaTime=0,a.fps=0}static get instance(){return a._instance||(a._instance=new a),a._instance}static DeltaTime(){return this.deltaTime}static LastUpdate(){return this.lastUpdate}static Fps(){return this.fps}static Update(){this.deltaTime=(performance.now()-this.lastUpdate)/1e3,this.lastUpdate=performance.now(),this.fps=1/this.deltaTime}}class r{constructor(e,t,s){this.x=e,this.y=t,s&&(this.z=s)}Equals(e,t){return null==t&&(t=1e-7),Math.abs(e.x-this.x)<=t&&Math.abs(e.y-this.y)<=t&&Math.abs(e.z-this.z)<=t}Add(e){return this.x+=e.x,this.y+=e.y,this.z&&(this.z+=e.z),this}Sub(e){return this.x-=e.x,this.y-=e.y,this.z&&(this.z-=e.z),this}Scale(e){return this.x*=e,this.y*=e,this.z&&(this.z*=e),this}Distance(e){var t=e.x-this.x,s=e.y-this.y,i=e.z-this.z;return i?Math.sqrt(t*t+s*s+i*i):Math.sqrt(t*t+s*s)}SquareDistance(e){var t=e.x-this.x,s=e.y-this.y,i=e.z-this.z;return i?t*t+s*s+i*i:t*t+s*s}SimpleDistance(e){var t=Math.abs(e.x-this.x),s=Math.abs(e.y-this.y),i=Math.abs(e.z-this.z);return i?Math.min(t,s,i):Math.min(t,s)}Dot(e){return this.z?this.x*e.x+this.y*e.y+this.z*e.z:this.x*e.x+this.y*e.y}Cross(e){var t=this.x,s=this.y,i=this.z,n=e.x,a=e.y,r=e.z;return this.x=s*r-i*a,this.y=i*n-t*r,this.z=t*a-s*n,this}Length(){return this.z?Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z):Math.sqrt(this.x*this.x+this.y*this.y)}Normalize(){var e=this.Length();return e>0&&this.Scale(1/e),this}Limit(e){var t=this.Length();return t>e&&t>0&&this.Scale(e/t),this}Lerp(e,t){return this.x=this.x+(e.x-this.x)*t,this.y=this.y+(e.y-this.y)*t,this.z=this.z+(e.z-this.z)*t,this}ToString(){return"{"+Math.floor(1e3*this.x)/1e3+", "+Math.floor(1e3*this.y)/1e3+", "+Math.floor(1e3*this.z)/1e3+"}"}static Zero(){return new r(0,0,0)}static One(){return new r(1,1,1)}static Up(){return new r(0,-1,0)}static Down(){return new r(0,1,0)}static Left(){return new r(-1,0,0)}static Right(){return new r(1,0,0)}static Front(){return new r(0,0,1)}static Back(){return new r(0,0,-1)}}r.FromArray=function(e){return new r(e[0],e[1],e[2])};class h{constructor(){}static get instance(){return h._instance||(h._instance=new h),h._instance}Init(e){this.containerElement=document.querySelector(e),this.containerElement.addEventListener("keydown",e=>{h.down[e.keyCode]=!0,e.repeat||(h.pressed[e.keyCode]=!0)}),this.containerElement.addEventListener("keyup",e=>{h.down[e.keyCode]=!1,h.released[e.keyCode]=!0}),this.containerElement.addEventListener("mousemove",e=>{h.mousePos.x=e.clientX,h.mousePos.y=e.clientY}),this.containerElement.addEventListener("mousedown",e=>{h.mouseDown[e.button]=!0,h.mousePressed[e.button]=!0}),this.containerElement.addEventListener("mouseup",e=>{h.mouseDown[e.button]=!1,h.mouseReleased[e.button]=!0}),this.containerElement.addEventListener("wheel",e=>{h.mouseWheel.x+=e.deltaX,h.mouseWheel.y+=e.deltaY,h.mouseWheel.z+=e.deltaZ})}Update(){for(var e=0,t=Object.keys(h.pressed).length;e<t;e++)h.pressed[Object.keys(h.pressed)[e]]=!1;for(e=0,t=Object.keys(h.released).length;e<t;e++)h.released[Object.keys(h.released)[e]]=!1;for(e=0,t=Object.keys(h.mouseReleased).length;e<t;e++)h.mouseReleased[Object.keys(h.mouseReleased)[e]]=!1}static GetKeyDown(e){return this.down[e]}static GetMousePosition(){return this.mousePos}static GetMouseDown(e){return this.mouseDown[e]}static GetMouseReleased(e){return this.mouseReleased[e]}static GetMouseWheel(){return this.mouseWheel}static SetCursor(e){this.instance.containerElement.style.cursor=e}static GetKeyPressed(e){return this.pressed[e]}static GetKeyReleased(e){return this.released[e]}}var o,c,d,u;h.pressed={},h.down={},h.released={},h.mousePressed={},h.mouseDown={},h.mouseReleased={},h.mousePos=new r(0,0),h.mouseWheel=new r(0,0,0),function(e){e.Hidden="none",e.Default="default",e.Pointer="pointer",e.Help="help",e.Loading="wait",e.Crosshair="crosshair",e.Grab="grab",e.Grabbing="grabbing",e.NotAllowed="not-allowed"}(o||(o={})),function(e){e[e.Left=0]="Left",e[e.Middle=1]="Middle",e[e.Right=2]="Right"}(c||(c={})),function(e){e[e.Backspace=8]="Backspace",e[e.Tab=9]="Tab",e[e.Enter=13]="Enter",e[e.Shift=16]="Shift",e[e.Ctrl=17]="Ctrl",e[e.Alt=18]="Alt",e[e.PauseBreak=19]="PauseBreak",e[e.CapsLock=20]="CapsLock",e[e.Escape=27]="Escape",e[e.Space=32]="Space",e[e.PageUp=33]="PageUp",e[e.PageDown=34]="PageDown",e[e.End=35]="End",e[e.Home=36]="Home",e[e.LeftArrow=37]="LeftArrow",e[e.UpArrow=38]="UpArrow",e[e.RightArrow=39]="RightArrow",e[e.DownArrow=40]="DownArrow",e[e.Insert=45]="Insert",e[e.Delete=46]="Delete",e[e.Zero=48]="Zero",e[e.ClosedParen=48]="ClosedParen",e[e.One=49]="One",e[e.ExclamationMark=49]="ExclamationMark",e[e.Two=50]="Two",e[e.AtSign=50]="AtSign",e[e.Three=51]="Three",e[e.PoundSign=51]="PoundSign",e[e.Hash=51]="Hash",e[e.Four=52]="Four",e[e.DollarSign=52]="DollarSign",e[e.Five=53]="Five",e[e.PercentSign=53]="PercentSign",e[e.Six=54]="Six",e[e.Caret=54]="Caret",e[e.Hat=54]="Hat",e[e.Seven=55]="Seven",e[e.Ampersand=55]="Ampersand",e[e.Eight=56]="Eight",e[e.Star=56]="Star",e[e.Asterik=56]="Asterik",e[e.Nine=57]="Nine",e[e.OpenParen=57]="OpenParen",e[e.A=65]="A",e[e.B=66]="B",e[e.C=67]="C",e[e.D=68]="D",e[e.E=69]="E",e[e.F=70]="F",e[e.G=71]="G",e[e.H=72]="H",e[e.I=73]="I",e[e.J=74]="J",e[e.K=75]="K",e[e.L=76]="L",e[e.M=77]="M",e[e.N=78]="N",e[e.O=79]="O",e[e.P=80]="P",e[e.Q=81]="Q",e[e.R=82]="R",e[e.S=83]="S",e[e.T=84]="T",e[e.U=85]="U",e[e.V=86]="V",e[e.W=87]="W",e[e.X=88]="X",e[e.Y=89]="Y",e[e.Z=90]="Z",e[e.LeftWindowKey=91]="LeftWindowKey",e[e.RightWindowKey=92]="RightWindowKey",e[e.SelectKey=93]="SelectKey",e[e.Numpad0=96]="Numpad0",e[e.Numpad1=97]="Numpad1",e[e.Numpad2=98]="Numpad2",e[e.Numpad3=99]="Numpad3",e[e.Numpad4=100]="Numpad4",e[e.Numpad5=101]="Numpad5",e[e.Numpad6=102]="Numpad6",e[e.Numpad7=103]="Numpad7",e[e.Numpad8=104]="Numpad8",e[e.Numpad9=105]="Numpad9",e[e.Multiply=106]="Multiply",e[e.Add=107]="Add",e[e.Subtract=109]="Subtract",e[e.DecimalPoint=110]="DecimalPoint",e[e.Divide=111]="Divide",e[e.F1=112]="F1",e[e.F2=113]="F2",e[e.F3=114]="F3",e[e.F4=115]="F4",e[e.F5=116]="F5",e[e.F6=117]="F6",e[e.F7=118]="F7",e[e.F8=119]="F8",e[e.F9=120]="F9",e[e.F10=121]="F10",e[e.F11=122]="F11",e[e.F12=123]="F12",e[e.NumLock=144]="NumLock",e[e.ScrollLock=145]="ScrollLock",e[e.SemiColon=186]="SemiColon",e[e.Equals=187]="Equals",e[e.Comma=188]="Comma",e[e.Dash=189]="Dash",e[e.Period=190]="Period",e[e.UnderScore=189]="UnderScore",e[e.PlusSign=187]="PlusSign",e[e.ForwardSlash=191]="ForwardSlash",e[e.Tilde=192]="Tilde",e[e.GraveAccent=192]="GraveAccent",e[e.OpenBracket=219]="OpenBracket",e[e.ClosedBracket=221]="ClosedBracket",e[e.Quote=222]="Quote"}(d||(d={}));class l{constructor(e={}){e=Object.assign({scenes:[],width:1280,height:720,fullscreen:!1,container:"body"},e),this.sceneManager=i.instance,this.drawManager=n.instance,this.inputManager=h.instance;for(var t=0,a=e.scenes.length;t<a;t++)this.sceneManager.AddScene(e.scenes[t]);if(this.width=e.width,this.height=e.height,this.fullscreen=e.fullscreen,this.container=e.container,e.scenes.length<=0){let e=new s;this.sceneManager.AddScene(e)}}Run(){return n.SetContext(new e({width:this.width,height:this.height,fullscreen:this.fullscreen,autostart:!1,type:e.Types.webgl}).appendTo(document.querySelector(this.container))),this.inputManager.Init(this.container),console.log("Engine is running in ",document.querySelector(this.container)),this.sceneManager.Load(0),requestAnimationFrame(this.Update.bind(this)),0}Update(){a.Update(),this.sceneManager.RenderLoadedScene(),n.GetContext().update(),this.inputManager.Update(),requestAnimationFrame(this.Update.bind(this))}}class m{constructor(){this.position=new r(0,0,0),this.rotation=0,this.scale=new r(1,1)}}class p{constructor(){this.id=t.generate(),this.transform=new m,this.components=[]}get GetId(){return this.id}Init(){for(var e=0,t=this.components.length;e<t;e++)this.components[e].Init()}Update(){for(var e=0,t=this.components.length;e<t;e++)this.components[e].Update()}AddComponent(e,...t){return this.components.push(new e(this,t)),this.components[this.components.length-1]}GetComponent(e){for(var t=0,s=this.components.length;t<s;t++)if(this.components[t].name===new e(this).name)return this.components[t]}GetComponents(e){let t=[];for(var s=0,i=this.components.length;s<i;s++)this.components[s].name===new e(this).name&&t.push(this.components[s]);return t}RemoveComponent(e){for(var t=0,s=this.components.length;t<s;t++)this.components[t].name===new e(this).name&&this.components.splice(t,1)}}class g{constructor(e){this.parent=e}get name(){return this._name}}class w extends g{constructor(e,t=[]){super(e),this._name="SpriteRenderer",this.isFirstUpdate=!1,this.image=t[0],this.scale=1,this.stretchMode=t[1]}Init(){console.log(n.instance),this.texture=new e.Texture(this.image),this.shape=n.GetContext().makeRectangle(this.parent.transform.position.x,this.parent.transform.position.y,this.parent.transform.scale.x,this.parent.transform.scale.y),this.shape.noStroke(),this.shape.fill=this.texture}Update(){switch(this.shape.width=this.parent.transform.scale.x,this.shape.height=this.parent.transform.scale.y,this.stretchMode){case 0:{let t=this.texture.image.naturalWidth/this.texture.image.naturalHeight;this.texture.scale=t<1?new e.Vector(this.scale*(this.shape.height/this.texture.image.naturalHeight),this.scale*(this.shape.height/this.texture.image.naturalHeight)):new e.Vector(this.scale*(this.shape.width/this.texture.image.naturalWidth),this.scale*(this.shape.width/this.texture.image.naturalWidth));break}case 1:{let t=this.texture.image.naturalWidth/this.texture.image.naturalHeight;this.texture.scale=t<1?new e.Vector(this.scale*(this.shape.width/this.texture.image.naturalWidth),this.scale*(this.shape.width/this.texture.image.naturalWidth)):new e.Vector(this.scale*(this.shape.height/this.texture.image.naturalHeight),this.scale*(this.shape.height/this.texture.image.naturalHeight));break}case 2:this.texture.scale=new e.Vector(this.scale*(this.shape.width/this.texture.image.naturalWidth),this.scale*(this.shape.height/this.texture.image.naturalHeight))}this.shape.translation.set(this.parent.transform.position.x,this.parent.transform.position.y)}}!function(e){e[e.BestFit=0]="BestFit",e[e.Cover=1]="Cover",e[e.Stretch=2]="Stretch",e[e.Unscaled=3]="Unscaled"}(u||(u={}));export{g as Component,o as Cursor,n as DrawManager,l as Engine,p as Entity,h as InputManager,d as Key,c as Mouse,s as Scene,i as SceneManager,u as SpriteMode,w as SpriteRenderer,a as TimeManager,m as Transform,r as Vec};
