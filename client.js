/*
 * Client half of the "绝区零 · 立绘" decoration.
 *
 * One piece rides the composer: an animated Spine figure standing on the
 * input card's top-right corner. Pressing the painted figure fades it to a
 * ghost and lets clicks through to whatever it covers; the empty corners of
 * the 180×240 stage never catch a press in the first place.
 *
 * `client.js` is generated from this file by `_extract/build-client.mjs`,
 * which substitutes the runtime placeholder with the bundled Spine runtime.
 */
window.__ModuleLoader__.load({
  id: '@local/zzz-spine',
  factory(require) {
    const React = require('react')
    const h = React.createElement

    /* eslint-disable-next-line no-unused-vars */
    const spine = (function () {
"use strict";var Ns=class{array=new Array;add(e){let t=this.contains(e);return this.array[e|0]=e|0,!t}contains(e){return this.array[e|0]!=null}remove(e){this.array[e|0]=void 0}clear(){this.array.length=0}},_e=class{entries={};size=0;add(e){let t=this.entries[e];return this.entries[e]=!0,t?!1:(this.size++,!0)}addAll(e){let t=this.size;for(var s=0,i=e.length;s<i;s++)this.add(e[s]);return t!=this.size}contains(e){return this.entries[e]}clear(){this.entries={},this.size=0}},D=class ge{constructor(t=0,s=0,i=0,r=0){this.r=t,this.g=s,this.b=i,this.a=r}static WHITE=new ge(1,1,1,1);static RED=new ge(1,0,0,1);static GREEN=new ge(0,1,0,1);static BLUE=new ge(0,0,1,1);static MAGENTA=new ge(1,0,1,1);set(t,s,i,r){return this.r=t,this.g=s,this.b=i,this.a=r,this.clamp()}setFromColor(t){return this.r=t.r,this.g=t.g,this.b=t.b,this.a=t.a,this}setFromString(t){return t=t.charAt(0)=="#"?t.substr(1):t,this.r=parseInt(t.substr(0,2),16)/255,this.g=parseInt(t.substr(2,2),16)/255,this.b=parseInt(t.substr(4,2),16)/255,this.a=t.length!=8?1:parseInt(t.substr(6,2),16)/255,this}add(t,s,i,r){return this.r+=t,this.g+=s,this.b+=i,this.a+=r,this.clamp()}clamp(){return this.r<0?this.r=0:this.r>1&&(this.r=1),this.g<0?this.g=0:this.g>1&&(this.g=1),this.b<0?this.b=0:this.b>1&&(this.b=1),this.a<0?this.a=0:this.a>1&&(this.a=1),this}static rgba8888ToColor(t,s){t.r=((s&4278190080)>>>24)/255,t.g=((s&16711680)>>>16)/255,t.b=((s&65280)>>>8)/255,t.a=(s&255)/255}static rgb888ToColor(t,s){t.r=((s&16711680)>>>16)/255,t.g=((s&65280)>>>8)/255,t.b=(s&255)/255}toRgb888(){const t=s=>("0"+(s*255).toString(16)).slice(-2);return+("0x"+t(this.r)+t(this.g)+t(this.b))}static fromString(t,s=new ge){return s.setFromString(t)}},R=class le{static PI=3.1415927;static PI2=le.PI*2;static invPI2=1/le.PI2;static radiansToDegrees=180/le.PI;static radDeg=le.radiansToDegrees;static degreesToRadians=le.PI/180;static degRad=le.degreesToRadians;static clamp(t,s,i){return t<s?s:t>i?i:t}static cosDeg(t){return Math.cos(t*le.degRad)}static sinDeg(t){return Math.sin(t*le.degRad)}static atan2Deg(t,s){return Math.atan2(t,s)*le.degRad}static signum(t){return t>0?1:t<0?-1:0}static toInt(t){return t>0?Math.floor(t):Math.ceil(t)}static cbrt(t){let s=Math.pow(Math.abs(t),.3333333333333333);return t<0?-s:s}static randomTriangular(t,s){return le.randomTriangularWith(t,s,(t+s)*.5)}static randomTriangularWith(t,s,i){let r=Math.random(),h=s-t;return r<=(i-t)/h?t+Math.sqrt(r*h*(i-t)):s-Math.sqrt((1-r)*h*(s-i))}static isPowerOfTwo(t){return t&&(t&t-1)===0}},ts=class{apply(e,t,s){return e+(t-e)*this.applyInternal(s)}},ss=class extends ts{power=2;constructor(e){super(),this.power=e}applyInternal(e){return e<=.5?Math.pow(e*2,this.power)/2:Math.pow((e-1)*2,this.power)/(this.power%2==0?-2:2)+1}},Os=class extends ss{constructor(e){super(e)}applyInternal(e){return Math.pow(e-1,this.power)*(this.power%2==0?-1:1)+1}},P=class pe{static SUPPORTS_TYPED_ARRAYS=typeof Float32Array<"u";static arrayCopy(t,s,i,r,h){for(let o=s,a=r;o<s+h;o++,a++)i[a]=t[o]}static arrayFill(t,s,i,r){for(let h=s;h<i;h++)t[h]=r}static setArraySize(t,s,i=0){let r=t.length;if(r==s)return t;if(t.length=s,r<s)for(let h=r;h<s;h++)t[h]=i;return t}static ensureArrayCapacity(t,s,i=0){return t.length>=s?t:pe.setArraySize(t,s,i)}static newArray(t,s){let i=new Array(t);for(let r=0;r<t;r++)i[r]=s;return i}static newFloatArray(t){if(pe.SUPPORTS_TYPED_ARRAYS)return new Float32Array(t);{let s=new Array(t);for(let i=0;i<s.length;i++)s[i]=0;return s}}static newShortArray(t){if(pe.SUPPORTS_TYPED_ARRAYS)return new Int16Array(t);{let s=new Array(t);for(let i=0;i<s.length;i++)s[i]=0;return s}}static toFloatArray(t){return pe.SUPPORTS_TYPED_ARRAYS?new Float32Array(t):t}static toSinglePrecision(t){return pe.SUPPORTS_TYPED_ARRAYS?Math.fround(t):t}static webkit602BugfixHelper(t,s){}static contains(t,s,i=!0){for(var r=0;r<t.length;r++)if(t[r]==s)return!0;return!1}static enumValue(t,s){return t[s[0].toUpperCase()+s.slice(1)]}},Ds=class{static logBones(e){for(let t=0;t<e.bones.length;t++){let s=e.bones[t];console.log(s.data.name+", "+s.a+", "+s.b+", "+s.c+", "+s.d+", "+s.worldX+", "+s.worldY)}}},Ae=class{items=new Array;instantiator;constructor(e){this.instantiator=e}obtain(){return this.items.length>0?this.items.pop():this.instantiator()}free(e){e.reset&&e.reset(),this.items.push(e)}freeAll(e){for(let t=0;t<e.length;t++)this.free(e[t])}clear(){this.items.length=0}},Xe=class{constructor(e=0,t=0){this.x=e,this.y=t}set(e,t){return this.x=e,this.y=t,this}length(){let e=this.x,t=this.y;return Math.sqrt(e*e+t*t)}normalize(){let e=this.length();return e!=0&&(this.x/=e,this.y/=e),this}},qs=class{maxDelta=.064;framesPerSecond=0;delta=0;totalTime=0;lastTime=Date.now()/1e3;frameCount=0;frameTime=0;update(){let e=Date.now()/1e3;this.delta=e-this.lastTime,this.frameTime+=this.delta,this.totalTime+=this.delta,this.delta>this.maxDelta&&(this.delta=this.maxDelta),this.lastTime=e,this.frameCount++,this.frameTime>1&&(this.framesPerSecond=this.frameCount/this.frameTime,this.frameTime=0,this.frameCount=0)}},Ws=class{values;addedValues=0;lastValue=0;mean=0;dirty=!0;constructor(e=32){this.values=new Array(e)}hasEnoughData(){return this.addedValues>=this.values.length}addValue(e){this.addedValues<this.values.length&&this.addedValues++,this.values[this.lastValue++]=e,this.lastValue>this.values.length-1&&(this.lastValue=0),this.dirty=!0}getMean(){if(this.hasEnoughData()){if(this.dirty){let e=0;for(let t=0;t<this.values.length;t++)e+=this.values[t];this.mean=e/this.values.length,this.dirty=!1}return this.mean}return 0}},Ge=class{name;constructor(e){if(!e)throw new Error("name cannot be null.");this.name=e}},oe=class Ms extends Ge{static nextID=0;id=Ms.nextID++;bones=null;vertices=[];worldVerticesLength=0;timelineAttachment=this;constructor(t){super(t)}computeWorldVertices(t,s,i,r,h,o){i=h+(i>>1)*o;let a=t.bone.skeleton,n=t.deform,l=this.vertices,c=this.bones;if(!c){n.length>0&&(l=n);let u=t.bone,x=u.worldX,w=u.worldY,p=u.a,g=u.b,b=u.c,y=u.d;for(let v=s,A=h;A<i;v+=2,A+=o){let S=l[v],I=l[v+1];r[A]=S*p+I*g+x,r[A+1]=S*b+I*y+w}return}let d=0,f=0;for(let u=0;u<s;u+=2){let x=c[d];d+=x+1,f+=x}let m=a.bones;if(n.length==0)for(let u=h,x=f*3;u<i;u+=o){let w=0,p=0,g=c[d++];for(g+=d;d<g;d++,x+=3){let b=m[c[d]],y=l[x],v=l[x+1],A=l[x+2];w+=(y*b.a+v*b.b+b.worldX)*A,p+=(y*b.c+v*b.d+b.worldY)*A}r[u]=w,r[u+1]=p}else{let u=n;for(let x=h,w=f*3,p=f<<1;x<i;x+=o){let g=0,b=0,y=c[d++];for(y+=d;d<y;d++,w+=3,p+=2){let v=m[c[d]],A=l[w]+u[p],S=l[w+1]+u[p+1],I=l[w+2];g+=(A*v.a+S*v.b+v.worldX)*I,b+=(A*v.c+S*v.d+v.worldY)*I}r[x]=g,r[x+1]=b}}}copyTo(t){this.bones?(t.bones=new Array(this.bones.length),P.arrayCopy(this.bones,0,t.bones,0,this.bones.length)):t.bones=null,this.vertices&&(t.vertices=P.newFloatArray(this.vertices.length),P.arrayCopy(this.vertices,0,t.vertices,0,this.vertices.length)),t.worldVerticesLength=this.worldVerticesLength,t.timelineAttachment=this.timelineAttachment}},is=class Oe{static _nextID=0;id=Oe.nextID();regions;start=0;digits=0;setupIndex=0;constructor(t){this.regions=new Array(t)}copy(){let t=new Oe(this.regions.length);return P.arrayCopy(this.regions,0,t.regions,0,this.regions.length),t.start=this.start,t.digits=this.digits,t.setupIndex=this.setupIndex,t}apply(t,s){let i=t.sequenceIndex;i==-1&&(i=this.setupIndex),i>=this.regions.length&&(i=this.regions.length-1);let r=this.regions[i];s.region!=r&&(s.region=r,s.updateRegion())}getPath(t,s){let i=t,r=(this.start+s).toString();for(let h=this.digits-r.length;h>0;h--)i+="0";return i+=r,i}static nextID(){return Oe._nextID++}},rs=(e=>(e[e.hold=0]="hold",e[e.once=1]="once",e[e.loop=2]="loop",e[e.pingpong=3]="pingpong",e[e.onceReverse=4]="onceReverse",e[e.loopReverse=5]="loopReverse",e[e.pingpongReverse=6]="pingpongReverse",e))(rs||{}),as=[0,1,2,3,4,5,6],Fe=class{name;timelines=[];timelineIds=new _e;duration;constructor(e,t,s){if(!e)throw new Error("name cannot be null.");this.name=e,this.setTimelines(t),this.duration=s}setTimelines(e){if(!e)throw new Error("timelines cannot be null.");this.timelines=e,this.timelineIds.clear();for(var t=0;t<e.length;t++)this.timelineIds.addAll(e[t].getPropertyIds())}hasTimeline(e){for(let t=0;t<e.length;t++)if(this.timelineIds.contains(e[t]))return!0;return!1}apply(e,t,s,i,r,h,o,a){if(!e)throw new Error("skeleton cannot be null.");i&&this.duration!=0&&(s%=this.duration,t>0&&(t%=this.duration));let n=this.timelines;for(let l=0,c=n.length;l<c;l++)n[l].apply(e,t,s,r,h,o,a)}},ns=(e=>(e[e.setup=0]="setup",e[e.first=1]="first",e[e.replace=2]="replace",e[e.add=3]="add",e))(ns||{}),ls=(e=>(e[e.mixIn=0]="mixIn",e[e.mixOut=1]="mixOut",e))(ls||{}),q={rotate:0,x:1,y:2,scaleX:3,scaleY:4,shearX:5,shearY:6,inherit:7,rgb:8,alpha:9,rgb2:10,attachment:11,deform:12,event:13,drawOrder:14,ikConstraint:15,transformConstraint:16,pathConstraintPosition:17,pathConstraintSpacing:18,pathConstraintMix:19,physicsConstraintInertia:20,physicsConstraintStrength:21,physicsConstraintDamping:22,physicsConstraintMass:23,physicsConstraintWind:24,physicsConstraintGravity:25,physicsConstraintMix:26,physicsConstraintReset:27,sequence:28},J=class{propertyIds;frames;constructor(e,t){this.propertyIds=t,this.frames=P.newFloatArray(e*this.getFrameEntries())}getPropertyIds(){return this.propertyIds}getFrameEntries(){return 1}getFrameCount(){return this.frames.length/this.getFrameEntries()}getDuration(){return this.frames[this.frames.length-this.getFrameEntries()]}static search1(e,t){let s=e.length;for(let i=1;i<s;i++)if(e[i]>t)return i-1;return s-1}static search(e,t,s){let i=e.length;for(let r=s;r<i;r+=s)if(e[r]>t)return r-s;return i-s}},ae=class extends J{curves;constructor(e,t,s){super(e,s),this.curves=P.newFloatArray(e+t*18),this.curves[e-1]=1}setLinear(e){this.curves[e]=0}setStepped(e){this.curves[e]=1}shrink(e){let t=this.getFrameCount()+e*18;if(this.curves.length>t){let s=P.newFloatArray(t);P.arrayCopy(this.curves,0,s,0,t),this.curves=s}}setBezier(e,t,s,i,r,h,o,a,n,l,c){let d=this.curves,f=this.getFrameCount()+e*18;s==0&&(d[t]=2+f);let m=(i-h*2+a)*.03,u=(r-o*2+n)*.03,x=((h-a)*3-i+l)*.006,w=((o-n)*3-r+c)*.006,p=m*2+x,g=u*2+w,b=(h-i)*.3+m+x*.16666667,y=(o-r)*.3+u+w*.16666667,v=i+b,A=r+y;for(let S=f+18;f<S;f+=2)d[f]=v,d[f+1]=A,b+=p,y+=g,p+=x,g+=w,v+=b,A+=y}getBezierValue(e,t,s,i){let r=this.curves;if(r[i]>e){let n=this.frames[t],l=this.frames[t+s];return l+(e-n)/(r[i]-n)*(r[i+1]-l)}let h=i+18;for(i+=2;i<h;i+=2)if(r[i]>=e){let n=r[i-2],l=r[i-1];return l+(e-n)/(r[i]-n)*(r[i+1]-l)}t+=this.getFrameEntries();let o=r[h-2],a=r[h-1];return a+(e-o)/(this.frames[t]-o)*(this.frames[t+s]-a)}},ie=class extends ae{constructor(e,t,s){super(e,t,[s])}getFrameEntries(){return 2}setFrame(e,t,s){e<<=1,this.frames[e]=t,this.frames[e+1]=s}getCurveValue(e){let t=this.frames,s=t.length-2;for(let r=2;r<=s;r+=2)if(t[r]>e){s=r-2;break}let i=this.curves[s>>1];switch(i){case 0:let r=t[s],h=t[s+1];return h+(e-r)/(t[s+2]-r)*(t[s+2+1]-h);case 1:return t[s+1]}return this.getBezierValue(e,s,1,i-2)}getRelativeValue(e,t,s,i,r){if(e<this.frames[0]){switch(s){case 0:return r;case 1:return i+(r-i)*t}return i}let h=this.getCurveValue(e);switch(s){case 0:return r+h*t;case 1:case 2:h+=r-i}return i+h*t}getAbsoluteValue(e,t,s,i,r){if(e<this.frames[0]){switch(s){case 0:return r;case 1:return i+(r-i)*t}return i}let h=this.getCurveValue(e);return s==0?r+(h-r)*t:i+(h-i)*t}getAbsoluteValue2(e,t,s,i,r,h){if(e<this.frames[0]){switch(s){case 0:return r;case 1:return i+(r-i)*t}return i}return s==0?r+(h-r)*t:i+(h-i)*t}getScaleValue(e,t,s,i,r,h){const o=this.frames;if(e<o[0]){switch(s){case 0:return h;case 1:return r+(h-r)*t}return r}let a=this.getCurveValue(e)*h;if(t==1)return s==3?r+a-h:a;if(i==1)switch(s){case 0:return h+(Math.abs(a)*R.signum(h)-h)*t;case 1:case 2:return r+(Math.abs(a)*R.signum(r)-r)*t}else{let n=0;switch(s){case 0:return n=Math.abs(h)*R.signum(a),n+(a-n)*t;case 1:case 2:return n=Math.abs(r)*R.signum(a),n+(a-n)*t}}return r+(a-h)*t}},Ee=class extends ae{constructor(e,t,s,i){super(e,t,[s,i])}getFrameEntries(){return 3}setFrame(e,t,s,i){e*=3,this.frames[e]=t,this.frames[e+1]=s,this.frames[e+2]=i}},Se=class extends ie{boneIndex=0;constructor(e,t,s){super(e,t,q.rotate+"|"+s),this.boneIndex=s}apply(e,t,s,i,r,h,o){let a=e.bones[this.boneIndex];a.active&&(a.rotation=this.getRelativeValue(s,r,h,a.rotation,a.data.rotation))}},$e=class extends Ee{boneIndex=0;constructor(e,t,s){super(e,t,q.x+"|"+s,q.y+"|"+s),this.boneIndex=s}apply(e,t,s,i,r,h,o){let a=e.bones[this.boneIndex];if(!a.active)return;let n=this.frames;if(s<n[0]){switch(h){case 0:a.x=a.data.x,a.y=a.data.y;return;case 1:a.x+=(a.data.x-a.x)*r,a.y+=(a.data.y-a.y)*r}return}let l=0,c=0,d=J.search(n,s,3),f=this.curves[d/3];switch(f){case 0:let m=n[d];l=n[d+1],c=n[d+2];let u=(s-m)/(n[d+3]-m);l+=(n[d+3+1]-l)*u,c+=(n[d+3+2]-c)*u;break;case 1:l=n[d+1],c=n[d+2];break;default:l=this.getBezierValue(s,d,1,f-2),c=this.getBezierValue(s,d,2,f+18-2)}switch(h){case 0:a.x=a.data.x+l*r,a.y=a.data.y+c*r;break;case 1:case 2:a.x+=(a.data.x+l-a.x)*r,a.y+=(a.data.y+c-a.y)*r;break;case 3:a.x+=l*r,a.y+=c*r}}},He=class extends ie{boneIndex=0;constructor(e,t,s){super(e,t,q.x+"|"+s),this.boneIndex=s}apply(e,t,s,i,r,h,o){let a=e.bones[this.boneIndex];a.active&&(a.x=this.getRelativeValue(s,r,h,a.x,a.data.x))}},Je=class extends ie{boneIndex=0;constructor(e,t,s){super(e,t,q.y+"|"+s),this.boneIndex=s}apply(e,t,s,i,r,h,o){let a=e.bones[this.boneIndex];a.active&&(a.y=this.getRelativeValue(s,r,h,a.y,a.data.y))}},je=class extends Ee{boneIndex=0;constructor(e,t,s){super(e,t,q.scaleX+"|"+s,q.scaleY+"|"+s),this.boneIndex=s}apply(e,t,s,i,r,h,o){let a=e.bones[this.boneIndex];if(!a.active)return;let n=this.frames;if(s<n[0]){switch(h){case 0:a.scaleX=a.data.scaleX,a.scaleY=a.data.scaleY;return;case 1:a.scaleX+=(a.data.scaleX-a.scaleX)*r,a.scaleY+=(a.data.scaleY-a.scaleY)*r}return}let l,c,d=J.search(n,s,3),f=this.curves[d/3];switch(f){case 0:let m=n[d];l=n[d+1],c=n[d+2];let u=(s-m)/(n[d+3]-m);l+=(n[d+3+1]-l)*u,c+=(n[d+3+2]-c)*u;break;case 1:l=n[d+1],c=n[d+2];break;default:l=this.getBezierValue(s,d,1,f-2),c=this.getBezierValue(s,d,2,f+18-2)}if(l*=a.data.scaleX,c*=a.data.scaleY,r==1)h==3?(a.scaleX+=l-a.data.scaleX,a.scaleY+=c-a.data.scaleY):(a.scaleX=l,a.scaleY=c);else{let m=0,u=0;if(o==1)switch(h){case 0:m=a.data.scaleX,u=a.data.scaleY,a.scaleX=m+(Math.abs(l)*R.signum(m)-m)*r,a.scaleY=u+(Math.abs(c)*R.signum(u)-u)*r;break;case 1:case 2:m=a.scaleX,u=a.scaleY,a.scaleX=m+(Math.abs(l)*R.signum(m)-m)*r,a.scaleY=u+(Math.abs(c)*R.signum(u)-u)*r;break;case 3:a.scaleX+=(l-a.data.scaleX)*r,a.scaleY+=(c-a.data.scaleY)*r}else switch(h){case 0:m=Math.abs(a.data.scaleX)*R.signum(l),u=Math.abs(a.data.scaleY)*R.signum(c),a.scaleX=m+(l-m)*r,a.scaleY=u+(c-u)*r;break;case 1:case 2:m=Math.abs(a.scaleX)*R.signum(l),u=Math.abs(a.scaleY)*R.signum(c),a.scaleX=m+(l-m)*r,a.scaleY=u+(c-u)*r;break;case 3:a.scaleX+=(l-a.data.scaleX)*r,a.scaleY+=(c-a.data.scaleY)*r}}}},Ke=class extends ie{boneIndex=0;constructor(e,t,s){super(e,t,q.scaleX+"|"+s),this.boneIndex=s}apply(e,t,s,i,r,h,o){let a=e.bones[this.boneIndex];a.active&&(a.scaleX=this.getScaleValue(s,r,h,o,a.scaleX,a.data.scaleX))}},Qe=class extends ie{boneIndex=0;constructor(e,t,s){super(e,t,q.scaleY+"|"+s),this.boneIndex=s}apply(e,t,s,i,r,h,o){let a=e.bones[this.boneIndex];a.active&&(a.scaleY=this.getScaleValue(s,r,h,o,a.scaleY,a.data.scaleY))}},Ze=class extends Ee{boneIndex=0;constructor(e,t,s){super(e,t,q.shearX+"|"+s,q.shearY+"|"+s),this.boneIndex=s}apply(e,t,s,i,r,h,o){let a=e.bones[this.boneIndex];if(!a.active)return;let n=this.frames;if(s<n[0]){switch(h){case 0:a.shearX=a.data.shearX,a.shearY=a.data.shearY;return;case 1:a.shearX+=(a.data.shearX-a.shearX)*r,a.shearY+=(a.data.shearY-a.shearY)*r}return}let l=0,c=0,d=J.search(n,s,3),f=this.curves[d/3];switch(f){case 0:let m=n[d];l=n[d+1],c=n[d+2];let u=(s-m)/(n[d+3]-m);l+=(n[d+3+1]-l)*u,c+=(n[d+3+2]-c)*u;break;case 1:l=n[d+1],c=n[d+2];break;default:l=this.getBezierValue(s,d,1,f-2),c=this.getBezierValue(s,d,2,f+18-2)}switch(h){case 0:a.shearX=a.data.shearX+l*r,a.shearY=a.data.shearY+c*r;break;case 1:case 2:a.shearX+=(a.data.shearX+l-a.shearX)*r,a.shearY+=(a.data.shearY+c-a.shearY)*r;break;case 3:a.shearX+=l*r,a.shearY+=c*r}}},et=class extends ie{boneIndex=0;constructor(e,t,s){super(e,t,q.shearX+"|"+s),this.boneIndex=s}apply(e,t,s,i,r,h,o){let a=e.bones[this.boneIndex];a.active&&(a.shearX=this.getRelativeValue(s,r,h,a.shearX,a.data.shearX))}},tt=class extends ie{boneIndex=0;constructor(e,t,s){super(e,t,q.shearY+"|"+s),this.boneIndex=s}apply(e,t,s,i,r,h,o){let a=e.bones[this.boneIndex];a.active&&(a.shearY=this.getRelativeValue(s,r,h,a.shearY,a.data.shearY))}},st=class extends J{boneIndex=0;constructor(e,t){super(e,[q.inherit+"|"+t]),this.boneIndex=t}getFrameEntries(){return 2}setFrame(e,t,s){e*=2,this.frames[e]=t,this.frames[e+1]=s}apply(e,t,s,i,r,h,o){let a=e.bones[this.boneIndex];if(!a.active)return;if(o==1){h==0&&(a.inherit=a.data.inherit);return}let n=this.frames;if(s<n[0]){(h==0||h==1)&&(a.inherit=a.data.inherit);return}a.inherit=this.frames[J.search(n,s,2)+1]}},it=class extends ae{slotIndex=0;constructor(e,t,s){super(e,t,[q.rgb+"|"+s,q.alpha+"|"+s]),this.slotIndex=s}getFrameEntries(){return 5}setFrame(e,t,s,i,r,h){e*=5,this.frames[e]=t,this.frames[e+1]=s,this.frames[e+2]=i,this.frames[e+3]=r,this.frames[e+4]=h}apply(e,t,s,i,r,h,o){let a=e.slots[this.slotIndex];if(!a.bone.active)return;let n=this.frames,l=a.color;if(s<n[0]){let w=a.data.color;switch(h){case 0:l.setFromColor(w);return;case 1:l.add((w.r-l.r)*r,(w.g-l.g)*r,(w.b-l.b)*r,(w.a-l.a)*r)}return}let c=0,d=0,f=0,m=0,u=J.search(n,s,5),x=this.curves[u/5];switch(x){case 0:let w=n[u];c=n[u+1],d=n[u+2],f=n[u+3],m=n[u+4];let p=(s-w)/(n[u+5]-w);c+=(n[u+5+1]-c)*p,d+=(n[u+5+2]-d)*p,f+=(n[u+5+3]-f)*p,m+=(n[u+5+4]-m)*p;break;case 1:c=n[u+1],d=n[u+2],f=n[u+3],m=n[u+4];break;default:c=this.getBezierValue(s,u,1,x-2),d=this.getBezierValue(s,u,2,x+18-2),f=this.getBezierValue(s,u,3,x+18*2-2),m=this.getBezierValue(s,u,4,x+18*3-2)}r==1?l.set(c,d,f,m):(h==0&&l.setFromColor(a.data.color),l.add((c-l.r)*r,(d-l.g)*r,(f-l.b)*r,(m-l.a)*r))}},rt=class extends ae{slotIndex=0;constructor(e,t,s){super(e,t,[q.rgb+"|"+s]),this.slotIndex=s}getFrameEntries(){return 4}setFrame(e,t,s,i,r){e<<=2,this.frames[e]=t,this.frames[e+1]=s,this.frames[e+2]=i,this.frames[e+3]=r}apply(e,t,s,i,r,h,o){let a=e.slots[this.slotIndex];if(!a.bone.active)return;let n=this.frames,l=a.color;if(s<n[0]){let x=a.data.color;switch(h){case 0:l.r=x.r,l.g=x.g,l.b=x.b;return;case 1:l.r+=(x.r-l.r)*r,l.g+=(x.g-l.g)*r,l.b+=(x.b-l.b)*r}return}let c=0,d=0,f=0,m=J.search(n,s,4),u=this.curves[m>>2];switch(u){case 0:let x=n[m];c=n[m+1],d=n[m+2],f=n[m+3];let w=(s-x)/(n[m+4]-x);c+=(n[m+4+1]-c)*w,d+=(n[m+4+2]-d)*w,f+=(n[m+4+3]-f)*w;break;case 1:c=n[m+1],d=n[m+2],f=n[m+3];break;default:c=this.getBezierValue(s,m,1,u-2),d=this.getBezierValue(s,m,2,u+18-2),f=this.getBezierValue(s,m,3,u+18*2-2)}if(r==1)l.r=c,l.g=d,l.b=f;else{if(h==0){let x=a.data.color;l.r=x.r,l.g=x.g,l.b=x.b}l.r+=(c-l.r)*r,l.g+=(d-l.g)*r,l.b+=(f-l.b)*r}}},at=class extends ie{slotIndex=0;constructor(e,t,s){super(e,t,q.alpha+"|"+s),this.slotIndex=s}apply(e,t,s,i,r,h,o){let a=e.slots[this.slotIndex];if(!a.bone.active)return;let n=a.color;if(s<this.frames[0]){let c=a.data.color;switch(h){case 0:n.a=c.a;return;case 1:n.a+=(c.a-n.a)*r}return}let l=this.getCurveValue(s);r==1?n.a=l:(h==0&&(n.a=a.data.color.a),n.a+=(l-n.a)*r)}},nt=class extends ae{slotIndex=0;constructor(e,t,s){super(e,t,[q.rgb+"|"+s,q.alpha+"|"+s,q.rgb2+"|"+s]),this.slotIndex=s}getFrameEntries(){return 8}setFrame(e,t,s,i,r,h,o,a,n){e<<=3,this.frames[e]=t,this.frames[e+1]=s,this.frames[e+2]=i,this.frames[e+3]=r,this.frames[e+4]=h,this.frames[e+5]=o,this.frames[e+6]=a,this.frames[e+7]=n}apply(e,t,s,i,r,h,o){let a=e.slots[this.slotIndex];if(!a.bone.active)return;let n=this.frames,l=a.color,c=a.darkColor;if(s<n[0]){let y=a.data.color,v=a.data.darkColor;switch(h){case 0:l.setFromColor(y),c.r=v.r,c.g=v.g,c.b=v.b;return;case 1:l.add((y.r-l.r)*r,(y.g-l.g)*r,(y.b-l.b)*r,(y.a-l.a)*r),c.r+=(v.r-c.r)*r,c.g+=(v.g-c.g)*r,c.b+=(v.b-c.b)*r}return}let d=0,f=0,m=0,u=0,x=0,w=0,p=0,g=J.search(n,s,8),b=this.curves[g>>3];switch(b){case 0:let y=n[g];d=n[g+1],f=n[g+2],m=n[g+3],u=n[g+4],x=n[g+5],w=n[g+6],p=n[g+7];let v=(s-y)/(n[g+8]-y);d+=(n[g+8+1]-d)*v,f+=(n[g+8+2]-f)*v,m+=(n[g+8+3]-m)*v,u+=(n[g+8+4]-u)*v,x+=(n[g+8+5]-x)*v,w+=(n[g+8+6]-w)*v,p+=(n[g+8+7]-p)*v;break;case 1:d=n[g+1],f=n[g+2],m=n[g+3],u=n[g+4],x=n[g+5],w=n[g+6],p=n[g+7];break;default:d=this.getBezierValue(s,g,1,b-2),f=this.getBezierValue(s,g,2,b+18-2),m=this.getBezierValue(s,g,3,b+18*2-2),u=this.getBezierValue(s,g,4,b+18*3-2),x=this.getBezierValue(s,g,5,b+18*4-2),w=this.getBezierValue(s,g,6,b+18*5-2),p=this.getBezierValue(s,g,7,b+18*6-2)}if(r==1)l.set(d,f,m,u),c.r=x,c.g=w,c.b=p;else{if(h==0){l.setFromColor(a.data.color);let y=a.data.darkColor;c.r=y.r,c.g=y.g,c.b=y.b}l.add((d-l.r)*r,(f-l.g)*r,(m-l.b)*r,(u-l.a)*r),c.r+=(x-c.r)*r,c.g+=(w-c.g)*r,c.b+=(p-c.b)*r}}},lt=class extends ae{slotIndex=0;constructor(e,t,s){super(e,t,[q.rgb+"|"+s,q.rgb2+"|"+s]),this.slotIndex=s}getFrameEntries(){return 7}setFrame(e,t,s,i,r,h,o,a){e*=7,this.frames[e]=t,this.frames[e+1]=s,this.frames[e+2]=i,this.frames[e+3]=r,this.frames[e+4]=h,this.frames[e+5]=o,this.frames[e+6]=a}apply(e,t,s,i,r,h,o){let a=e.slots[this.slotIndex];if(!a.bone.active)return;let n=this.frames,l=a.color,c=a.darkColor;if(s<n[0]){let y=a.data.color,v=a.data.darkColor;switch(h){case 0:l.r=y.r,l.g=y.g,l.b=y.b,c.r=v.r,c.g=v.g,c.b=v.b;return;case 1:l.r+=(y.r-l.r)*r,l.g+=(y.g-l.g)*r,l.b+=(y.b-l.b)*r,c.r+=(v.r-c.r)*r,c.g+=(v.g-c.g)*r,c.b+=(v.b-c.b)*r}return}let d=0,f=0,m=0,u=0,x=0,w=0,p=0,g=J.search(n,s,7),b=this.curves[g/7];switch(b){case 0:let y=n[g];d=n[g+1],f=n[g+2],m=n[g+3],x=n[g+4],w=n[g+5],p=n[g+6];let v=(s-y)/(n[g+7]-y);d+=(n[g+7+1]-d)*v,f+=(n[g+7+2]-f)*v,m+=(n[g+7+3]-m)*v,x+=(n[g+7+4]-x)*v,w+=(n[g+7+5]-w)*v,p+=(n[g+7+6]-p)*v;break;case 1:d=n[g+1],f=n[g+2],m=n[g+3],x=n[g+4],w=n[g+5],p=n[g+6];break;default:d=this.getBezierValue(s,g,1,b-2),f=this.getBezierValue(s,g,2,b+18-2),m=this.getBezierValue(s,g,3,b+18*2-2),x=this.getBezierValue(s,g,4,b+18*3-2),w=this.getBezierValue(s,g,5,b+18*4-2),p=this.getBezierValue(s,g,6,b+18*5-2)}if(r==1)l.r=d,l.g=f,l.b=m,c.r=x,c.g=w,c.b=p;else{if(h==0){let y=a.data.color,v=a.data.darkColor;l.r=y.r,l.g=y.g,l.b=y.b,c.r=v.r,c.g=v.g,c.b=v.b}l.r+=(d-l.r)*r,l.g+=(f-l.g)*r,l.b+=(m-l.b)*r,c.r+=(x-c.r)*r,c.g+=(w-c.g)*r,c.b+=(p-c.b)*r}}},me=class extends J{slotIndex=0;attachmentNames;constructor(e,t){super(e,[q.attachment+"|"+t]),this.slotIndex=t,this.attachmentNames=new Array(e)}getFrameCount(){return this.frames.length}setFrame(e,t,s){this.frames[e]=t,this.attachmentNames[e]=s}apply(e,t,s,i,r,h,o){let a=e.slots[this.slotIndex];if(a.bone.active){if(o==1){h==0&&this.setAttachment(e,a,a.data.attachmentName);return}if(s<this.frames[0]){(h==0||h==1)&&this.setAttachment(e,a,a.data.attachmentName);return}this.setAttachment(e,a,this.attachmentNames[J.search1(this.frames,s)])}}setAttachment(e,t,s){t.setAttachment(s?e.getAttachment(this.slotIndex,s):null)}},ot=class extends ae{slotIndex=0;attachment;vertices;constructor(e,t,s,i){super(e,t,[q.deform+"|"+s+"|"+i.id]),this.slotIndex=s,this.attachment=i,this.vertices=new Array(e)}getFrameCount(){return this.frames.length}setFrame(e,t,s){this.frames[e]=t,this.vertices[e]=s}setBezier(e,t,s,i,r,h,o,a,n,l,c){let d=this.curves,f=this.getFrameCount()+e*18;s==0&&(d[t]=2+f);let m=(i-h*2+a)*.03,u=n*.03-o*.06,x=((h-a)*3-i+l)*.006,w=(o-n+.33333333)*.018,p=m*2+x,g=u*2+w,b=(h-i)*.3+m+x*.16666667,y=o*.3+u+w*.16666667,v=i+b,A=y;for(let S=f+18;f<S;f+=2)d[f]=v,d[f+1]=A,b+=p,y+=g,p+=x,g+=w,v+=b,A+=y}getCurvePercent(e,t){let s=this.curves,i=s[t];switch(i){case 0:let a=this.frames[t];return(e-a)/(this.frames[t+this.getFrameEntries()]-a);case 1:return 0}if(i-=2,s[i]>e){let a=this.frames[t];return s[i+1]*(e-a)/(s[i]-a)}let r=i+18;for(i+=2;i<r;i+=2)if(s[i]>=e){let a=s[i-2],n=s[i-1];return n+(e-a)/(s[i]-a)*(s[i+1]-n)}let h=s[r-2],o=s[r-1];return o+(1-o)*(e-h)/(this.frames[t+this.getFrameEntries()]-h)}apply(e,t,s,i,r,h,o){let a=e.slots[this.slotIndex];if(!a.bone.active)return;let n=a.getAttachment();if(!n||!(n instanceof oe)||n.timelineAttachment!=this.attachment)return;let l=a.deform;l.length==0&&(h=0);let c=this.vertices,d=c[0].length,f=this.frames;if(s<f[0]){switch(h){case 0:l.length=0;return;case 1:if(r==1){l.length=0;return}l.length=d;let g=n;if(g.bones){r=1-r;for(var m=0;m<d;m++)l[m]*=r}else{let b=g.vertices;for(var m=0;m<d;m++)l[m]+=(b[m]-l[m])*r}}return}if(l.length=d,s>=f[f.length-1]){let g=c[f.length-1];if(r==1)if(h==3){let b=n;if(b.bones)for(let y=0;y<d;y++)l[y]+=g[y];else{let y=b.vertices;for(let v=0;v<d;v++)l[v]+=g[v]-y[v]}}else P.arrayCopy(g,0,l,0,d);else switch(h){case 0:{let y=n;if(y.bones)for(let v=0;v<d;v++)l[v]=g[v]*r;else{let v=y.vertices;for(let A=0;A<d;A++){let S=v[A];l[A]=S+(g[A]-S)*r}}break}case 1:case 2:for(let y=0;y<d;y++)l[y]+=(g[y]-l[y])*r;break;case 3:let b=n;if(b.bones)for(let y=0;y<d;y++)l[y]+=g[y]*r;else{let y=b.vertices;for(let v=0;v<d;v++)l[v]+=(g[v]-y[v])*r}}return}let u=J.search1(f,s),x=this.getCurvePercent(s,u),w=c[u],p=c[u+1];if(r==1)if(h==3){let g=n;if(g.bones)for(let b=0;b<d;b++){let y=w[b];l[b]+=y+(p[b]-y)*x}else{let b=g.vertices;for(let y=0;y<d;y++){let v=w[y];l[y]+=v+(p[y]-v)*x-b[y]}}}else for(let g=0;g<d;g++){let b=w[g];l[g]=b+(p[g]-b)*x}else switch(h){case 0:{let b=n;if(b.bones)for(let y=0;y<d;y++){let v=w[y];l[y]=(v+(p[y]-v)*x)*r}else{let y=b.vertices;for(let v=0;v<d;v++){let A=w[v],S=y[v];l[v]=S+(A+(p[v]-A)*x-S)*r}}break}case 1:case 2:for(let b=0;b<d;b++){let y=w[b];l[b]+=(y+(p[b]-y)*x-l[b])*r}break;case 3:let g=n;if(g.bones)for(let b=0;b<d;b++){let y=w[b];l[b]+=(y+(p[b]-y)*x)*r}else{let b=g.vertices;for(let y=0;y<d;y++){let v=w[y];l[y]+=(v+(p[y]-v)*x-b[y])*r}}}}},Re=class Xs extends J{static propertyIds=[""+q.event];events;constructor(t){super(t,Xs.propertyIds),this.events=new Array(t)}getFrameCount(){return this.frames.length}setFrame(t,s){this.frames[t]=s.time,this.events[t]=s}apply(t,s,i,r,h,o,a){if(!r)return;let n=this.frames,l=this.frames.length;if(s>i)this.apply(t,s,Number.MAX_VALUE,r,h,o,a),s=-1;else if(s>=n[l-1])return;if(i<n[0])return;let c=0;if(s<n[0])c=0;else{c=J.search1(n,s)+1;let d=n[c];for(;c>0&&n[c-1]==d;)c--}for(;c<l&&i>=n[c];c++)r.push(this.events[c])}},we=class Fs extends J{static propertyIds=[""+q.drawOrder];drawOrders;constructor(t){super(t,Fs.propertyIds),this.drawOrders=new Array(t)}getFrameCount(){return this.frames.length}setFrame(t,s,i){this.frames[t]=s,this.drawOrders[t]=i}apply(t,s,i,r,h,o,a){if(a==1){o==0&&P.arrayCopy(t.slots,0,t.drawOrder,0,t.slots.length);return}if(i<this.frames[0]){(o==0||o==1)&&P.arrayCopy(t.slots,0,t.drawOrder,0,t.slots.length);return}let n=J.search1(this.frames,i),l=this.drawOrders[n];if(!l)P.arrayCopy(t.slots,0,t.drawOrder,0,t.slots.length);else{let c=t.drawOrder,d=t.slots;for(let f=0,m=l.length;f<m;f++)c[f]=d[l[f]]}}},ht=class extends ae{constraintIndex=0;constructor(e,t,s){super(e,t,[q.ikConstraint+"|"+s]),this.constraintIndex=s}getFrameEntries(){return 6}setFrame(e,t,s,i,r,h,o){e*=6,this.frames[e]=t,this.frames[e+1]=s,this.frames[e+2]=i,this.frames[e+3]=r,this.frames[e+4]=h?1:0,this.frames[e+5]=o?1:0}apply(e,t,s,i,r,h,o){let a=e.ikConstraints[this.constraintIndex];if(!a.active)return;let n=this.frames;if(s<n[0]){switch(h){case 0:a.mix=a.data.mix,a.softness=a.data.softness,a.bendDirection=a.data.bendDirection,a.compress=a.data.compress,a.stretch=a.data.stretch;return;case 1:a.mix+=(a.data.mix-a.mix)*r,a.softness+=(a.data.softness-a.softness)*r,a.bendDirection=a.data.bendDirection,a.compress=a.data.compress,a.stretch=a.data.stretch}return}let l=0,c=0,d=J.search(n,s,6),f=this.curves[d/6];switch(f){case 0:let m=n[d];l=n[d+1],c=n[d+2];let u=(s-m)/(n[d+6]-m);l+=(n[d+6+1]-l)*u,c+=(n[d+6+2]-c)*u;break;case 1:l=n[d+1],c=n[d+2];break;default:l=this.getBezierValue(s,d,1,f-2),c=this.getBezierValue(s,d,2,f+18-2)}h==0?(a.mix=a.data.mix+(l-a.data.mix)*r,a.softness=a.data.softness+(c-a.data.softness)*r,o==1?(a.bendDirection=a.data.bendDirection,a.compress=a.data.compress,a.stretch=a.data.stretch):(a.bendDirection=n[d+3],a.compress=n[d+4]!=0,a.stretch=n[d+5]!=0)):(a.mix+=(l-a.mix)*r,a.softness+=(c-a.softness)*r,o==0&&(a.bendDirection=n[d+3],a.compress=n[d+4]!=0,a.stretch=n[d+5]!=0))}},ct=class extends ae{constraintIndex=0;constructor(e,t,s){super(e,t,[q.transformConstraint+"|"+s]),this.constraintIndex=s}getFrameEntries(){return 7}setFrame(e,t,s,i,r,h,o,a){let n=this.frames;e*=7,n[e]=t,n[e+1]=s,n[e+2]=i,n[e+3]=r,n[e+4]=h,n[e+5]=o,n[e+6]=a}apply(e,t,s,i,r,h,o){let a=e.transformConstraints[this.constraintIndex];if(!a.active)return;let n=this.frames;if(s<n[0]){let p=a.data;switch(h){case 0:a.mixRotate=p.mixRotate,a.mixX=p.mixX,a.mixY=p.mixY,a.mixScaleX=p.mixScaleX,a.mixScaleY=p.mixScaleY,a.mixShearY=p.mixShearY;return;case 1:a.mixRotate+=(p.mixRotate-a.mixRotate)*r,a.mixX+=(p.mixX-a.mixX)*r,a.mixY+=(p.mixY-a.mixY)*r,a.mixScaleX+=(p.mixScaleX-a.mixScaleX)*r,a.mixScaleY+=(p.mixScaleY-a.mixScaleY)*r,a.mixShearY+=(p.mixShearY-a.mixShearY)*r}return}let l,c,d,f,m,u,x=J.search(n,s,7),w=this.curves[x/7];switch(w){case 0:let p=n[x];l=n[x+1],c=n[x+2],d=n[x+3],f=n[x+4],m=n[x+5],u=n[x+6];let g=(s-p)/(n[x+7]-p);l+=(n[x+7+1]-l)*g,c+=(n[x+7+2]-c)*g,d+=(n[x+7+3]-d)*g,f+=(n[x+7+4]-f)*g,m+=(n[x+7+5]-m)*g,u+=(n[x+7+6]-u)*g;break;case 1:l=n[x+1],c=n[x+2],d=n[x+3],f=n[x+4],m=n[x+5],u=n[x+6];break;default:l=this.getBezierValue(s,x,1,w-2),c=this.getBezierValue(s,x,2,w+18-2),d=this.getBezierValue(s,x,3,w+18*2-2),f=this.getBezierValue(s,x,4,w+18*3-2),m=this.getBezierValue(s,x,5,w+18*4-2),u=this.getBezierValue(s,x,6,w+18*5-2)}if(h==0){let p=a.data;a.mixRotate=p.mixRotate+(l-p.mixRotate)*r,a.mixX=p.mixX+(c-p.mixX)*r,a.mixY=p.mixY+(d-p.mixY)*r,a.mixScaleX=p.mixScaleX+(f-p.mixScaleX)*r,a.mixScaleY=p.mixScaleY+(m-p.mixScaleY)*r,a.mixShearY=p.mixShearY+(u-p.mixShearY)*r}else a.mixRotate+=(l-a.mixRotate)*r,a.mixX+=(c-a.mixX)*r,a.mixY+=(d-a.mixY)*r,a.mixScaleX+=(f-a.mixScaleX)*r,a.mixScaleY+=(m-a.mixScaleY)*r,a.mixShearY+=(u-a.mixShearY)*r}},dt=class extends ie{constraintIndex=0;constructor(e,t,s){super(e,t,q.pathConstraintPosition+"|"+s),this.constraintIndex=s}apply(e,t,s,i,r,h,o){let a=e.pathConstraints[this.constraintIndex];a.active&&(a.position=this.getAbsoluteValue(s,r,h,a.position,a.data.position))}},ft=class extends ie{constraintIndex=0;constructor(e,t,s){super(e,t,q.pathConstraintSpacing+"|"+s),this.constraintIndex=s}apply(e,t,s,i,r,h,o){let a=e.pathConstraints[this.constraintIndex];a.active&&(a.spacing=this.getAbsoluteValue(s,r,h,a.spacing,a.data.spacing))}},ut=class extends ae{constraintIndex=0;constructor(e,t,s){super(e,t,[q.pathConstraintMix+"|"+s]),this.constraintIndex=s}getFrameEntries(){return 4}setFrame(e,t,s,i,r){let h=this.frames;e<<=2,h[e]=t,h[e+1]=s,h[e+2]=i,h[e+3]=r}apply(e,t,s,i,r,h,o){let a=e.pathConstraints[this.constraintIndex];if(!a.active)return;let n=this.frames;if(s<n[0]){switch(h){case 0:a.mixRotate=a.data.mixRotate,a.mixX=a.data.mixX,a.mixY=a.data.mixY;return;case 1:a.mixRotate+=(a.data.mixRotate-a.mixRotate)*r,a.mixX+=(a.data.mixX-a.mixX)*r,a.mixY+=(a.data.mixY-a.mixY)*r}return}let l,c,d,f=J.search(n,s,4),m=this.curves[f>>2];switch(m){case 0:let u=n[f];l=n[f+1],c=n[f+2],d=n[f+3];let x=(s-u)/(n[f+4]-u);l+=(n[f+4+1]-l)*x,c+=(n[f+4+2]-c)*x,d+=(n[f+4+3]-d)*x;break;case 1:l=n[f+1],c=n[f+2],d=n[f+3];break;default:l=this.getBezierValue(s,f,1,m-2),c=this.getBezierValue(s,f,2,m+18-2),d=this.getBezierValue(s,f,3,m+18*2-2)}if(h==0){let u=a.data;a.mixRotate=u.mixRotate+(l-u.mixRotate)*r,a.mixX=u.mixX+(c-u.mixX)*r,a.mixY=u.mixY+(d-u.mixY)*r}else a.mixRotate+=(l-a.mixRotate)*r,a.mixX+=(c-a.mixX)*r,a.mixY+=(d-a.mixY)*r}},de=class extends ie{constraintIndex=0;constructor(e,t,s,i){super(e,t,i+"|"+s),this.constraintIndex=s}apply(e,t,s,i,r,h,o){let a;if(this.constraintIndex==-1){const n=s>=this.frames[0]?this.getCurveValue(s):0;for(const l of e.physicsConstraints)l.active&&this.global(l.data)&&this.set(l,this.getAbsoluteValue2(s,r,h,this.get(l),this.setup(l),n))}else a=e.physicsConstraints[this.constraintIndex],a.active&&this.set(a,this.getAbsoluteValue(s,r,h,this.get(a),this.setup(a)))}},mt=class extends de{constructor(e,t,s){super(e,t,s,q.physicsConstraintInertia)}setup(e){return e.data.inertia}get(e){return e.inertia}set(e,t){e.inertia=t}global(e){return e.inertiaGlobal}},gt=class extends de{constructor(e,t,s){super(e,t,s,q.physicsConstraintStrength)}setup(e){return e.data.strength}get(e){return e.strength}set(e,t){e.strength=t}global(e){return e.strengthGlobal}},xt=class extends de{constructor(e,t,s){super(e,t,s,q.physicsConstraintDamping)}setup(e){return e.data.damping}get(e){return e.damping}set(e,t){e.damping=t}global(e){return e.dampingGlobal}},bt=class extends de{constructor(e,t,s){super(e,t,s,q.physicsConstraintMass)}setup(e){return 1/e.data.massInverse}get(e){return 1/e.massInverse}set(e,t){e.massInverse=1/t}global(e){return e.massGlobal}},wt=class extends de{constructor(e,t,s){super(e,t,s,q.physicsConstraintWind)}setup(e){return e.data.wind}get(e){return e.wind}set(e,t){e.wind=t}global(e){return e.windGlobal}},pt=class extends de{constructor(e,t,s){super(e,t,s,q.physicsConstraintGravity)}setup(e){return e.data.gravity}get(e){return e.gravity}set(e,t){e.gravity=t}global(e){return e.gravityGlobal}},yt=class extends de{constructor(e,t,s){super(e,t,s,q.physicsConstraintMix)}setup(e){return e.data.mix}get(e){return e.mix}set(e,t){e.mix=t}global(e){return e.mixGlobal}},vt=class Es extends J{static propertyIds=[q.physicsConstraintReset.toString()];constraintIndex;constructor(t,s){super(t,Es.propertyIds),this.constraintIndex=s}getFrameCount(){return this.frames.length}setFrame(t,s){this.frames[t]=s}apply(t,s,i,r,h,o,a){let n;if(this.constraintIndex!=-1&&(n=t.physicsConstraints[this.constraintIndex],!n.active))return;const l=this.frames;if(s>i)this.apply(t,s,Number.MAX_VALUE,[],h,o,a),s=-1;else if(s>=l[l.length-1])return;if(!(i<l[0])&&(s<l[0]||i>=l[J.search1(l,s)+1]))if(n!=null)n.reset();else for(const c of t.physicsConstraints)c.active&&c.reset()}},At=class fe extends J{static ENTRIES=3;static MODE=1;static DELAY=2;slotIndex;attachment;constructor(t,s,i){super(t,[q.sequence+"|"+s+"|"+i.sequence.id]),this.slotIndex=s,this.attachment=i}getFrameEntries(){return fe.ENTRIES}getSlotIndex(){return this.slotIndex}getAttachment(){return this.attachment}setFrame(t,s,i,r,h){let o=this.frames;t*=fe.ENTRIES,o[t]=s,o[t+fe.MODE]=i|r<<4,o[t+fe.DELAY]=h}apply(t,s,i,r,h,o,a){let n=t.slots[this.slotIndex];if(!n.bone.active)return;let l=n.attachment,c=this.attachment;if(l!=c&&(!(l instanceof oe)||l.timelineAttachment!=c))return;if(a==1){o==0&&(n.sequenceIndex=-1);return}let d=this.frames;if(i<d[0]){(o==0||o==1)&&(n.sequenceIndex=-1);return}let f=J.search(d,i,fe.ENTRIES),m=d[f],u=d[f+fe.MODE],x=d[f+fe.DELAY];if(!this.attachment.sequence)return;let w=u>>4,p=this.attachment.sequence.regions.length,g=as[u&15];if(g!=0)switch(w+=(i-m)/x+1e-5|0,g){case 1:w=Math.min(p-1,w);break;case 2:w%=p;break;case 3:{let b=(p<<1)-2;w=b==0?0:w%b,w>=p&&(w=b-w);break}case 4:w=Math.max(p-1-w,0);break;case 5:w=p-1-w%p;break;case 6:{let b=(p<<1)-2;w=b==0?0:(w+p-1)%b,w>=p&&(w=b-w)}}n.sequenceIndex=w}},Us=class De{static _emptyAnimation=new Fe("<empty>",[],0);static emptyAnimation(){return De._emptyAnimation}data;tracks=new Array;timeScale=1;unkeyedState=0;events=new Array;listeners=new Array;queue=new hs(this);propertyIDs=new _e;animationsChanged=!1;trackEntryPool=new Ae(()=>new os);constructor(t){this.data=t}update(t){t*=this.timeScale;let s=this.tracks;for(let i=0,r=s.length;i<r;i++){let h=s[i];if(!h)continue;h.animationLast=h.nextAnimationLast,h.trackLast=h.nextTrackLast;let o=t*h.timeScale;if(h.delay>0){if(h.delay-=o,h.delay>0)continue;o=-h.delay,h.delay=0}let a=h.next;if(a){let n=h.trackLast-a.delay;if(n>=0){for(a.delay=0,a.trackTime+=h.timeScale==0?0:(n/h.timeScale+t)*a.timeScale,h.trackTime+=o,this.setCurrent(i,a,!0);a.mixingFrom;)a.mixTime+=t,a=a.mixingFrom;continue}}else if(h.trackLast>=h.trackEnd&&!h.mixingFrom){s[i]=null,this.queue.end(h),this.clearNext(h);continue}if(h.mixingFrom&&this.updateMixingFrom(h,t)){let n=h.mixingFrom;for(h.mixingFrom=null,n&&(n.mixingTo=null);n;)this.queue.end(n),n=n.mixingFrom}h.trackTime+=o}this.queue.drain()}updateMixingFrom(t,s){let i=t.mixingFrom;if(!i)return!0;let r=this.updateMixingFrom(i,s);return i.animationLast=i.nextAnimationLast,i.trackLast=i.nextTrackLast,t.nextTrackLast!=-1&&t.mixTime>=t.mixDuration?((i.totalAlpha==0||t.mixDuration==0)&&(t.mixingFrom=i.mixingFrom,i.mixingFrom!=null&&(i.mixingFrom.mixingTo=t),t.interruptAlpha=i.interruptAlpha,this.queue.end(i)),r):(i.trackTime+=s*i.timeScale,t.mixTime+=s,!1)}apply(t){if(!t)throw new Error("skeleton cannot be null.");this.animationsChanged&&this._animationsChanged();let s=this.events,i=this.tracks,r=!1;for(let f=0,m=i.length;f<m;f++){let u=i[f];if(!u||u.delay>0)continue;r=!0;let x=f==0?1:u.mixBlend,w=u.alpha;u.mixingFrom?w*=this.applyMixingFrom(u,t,x):u.trackTime>=u.trackEnd&&!u.next&&(w=0);let p=w>=u.alphaAttachmentThreshold,g=u.animationLast,b=u.getAnimationTime(),y=b,v=s;u.reverse&&(y=u.animation.duration-y,v=null);let A=u.animation.timelines,S=A.length;if(f==0&&w==1||x==3){f==0&&(p=!0);for(let I=0;I<S;I++){P.webkit602BugfixHelper(w,x);var h=A[I];h instanceof me?this.applyAttachmentTimeline(h,t,y,x,p):h.apply(t,g,y,v,w,x,0)}}else{let I=u.timelineMode,T=u.shortestRotation,M=!T&&u.timelinesRotation.length!=S<<1;M&&(u.timelinesRotation.length=S<<1);for(let Y=0;Y<S;Y++){let F=A[Y],E=I[Y]==Pe?x:0;!T&&F instanceof Se?this.applyRotateTimeline(F,t,y,w,E,u.timelinesRotation,Y<<1,M):F instanceof me?this.applyAttachmentTimeline(F,t,y,x,p):(P.webkit602BugfixHelper(w,x),F.apply(t,g,y,v,w,E,0))}}this.queueEvents(u,b),s.length=0,u.nextAnimationLast=b,u.nextTrackLast=u.trackTime}for(var o=this.unkeyedState+It,a=t.slots,n=0,l=t.slots.length;n<l;n++){var c=a[n];if(c.attachmentState==o){var d=c.data.attachmentName;c.setAttachment(d?t.getAttachment(c.data.index,d):null)}}return this.unkeyedState+=2,this.queue.drain(),r}applyMixingFrom(t,s,i){let r=t.mixingFrom;r.mixingFrom&&this.applyMixingFrom(r,s,i);let h=0;t.mixDuration==0?(h=1,i==1&&(i=0)):(h=t.mixTime/t.mixDuration,h>1&&(h=1),i!=1&&(i=r.mixBlend));let o=h<r.mixAttachmentThreshold,a=h<r.mixDrawOrderThreshold,n=r.animation.timelines,l=n.length,c=r.alpha*t.interruptAlpha,d=c*(1-h),f=r.animationLast,m=r.getAnimationTime(),u=m,x=null;if(r.reverse?u=r.animation.duration-u:h<r.eventThreshold&&(x=this.events),i==3)for(let w=0;w<l;w++)n[w].apply(s,f,u,x,d,i,1);else{let w=r.timelineMode,p=r.timelineHoldMix,g=r.shortestRotation,b=!g&&r.timelinesRotation.length!=l<<1;b&&(r.timelinesRotation.length=l<<1),r.totalAlpha=0;for(let y=0;y<l;y++){let v=n[y],A=1,S,I=0;switch(w[y]){case Pe:if(!a&&v instanceof we)continue;S=i,I=d;break;case St:S=0,I=d;break;case Ct:S=i,I=c;break;case Be:S=0,I=c;break;default:S=0;let T=p[y];I=c*Math.max(0,1-T.mixTime/T.mixDuration);break}r.totalAlpha+=I,!g&&v instanceof Se?this.applyRotateTimeline(v,s,u,I,S,r.timelinesRotation,y<<1,b):v instanceof me?this.applyAttachmentTimeline(v,s,u,S,o&&I>=r.alphaAttachmentThreshold):(P.webkit602BugfixHelper(I,i),a&&v instanceof we&&S==0&&(A=0),v.apply(s,f,u,x,I,S,A))}}return t.mixDuration>0&&this.queueEvents(r,m),this.events.length=0,r.nextAnimationLast=m,r.nextTrackLast=r.trackTime,h}applyAttachmentTimeline(t,s,i,r,h){var o=s.slots[t.slotIndex];o.bone.active&&(i<t.frames[0]?(r==0||r==1)&&this.setAttachment(s,o,o.data.attachmentName,h):this.setAttachment(s,o,t.attachmentNames[J.search1(t.frames,i)],h),o.attachmentState<=this.unkeyedState&&(o.attachmentState=this.unkeyedState+It))}setAttachment(t,s,i,r){s.setAttachment(i?t.getAttachment(s.data.index,i):null),r&&(s.attachmentState=this.unkeyedState+fs)}applyRotateTimeline(t,s,i,r,h,o,a,n){if(n&&(o[a]=0),r==1){t.apply(s,0,i,null,1,h,0);return}let l=s.bones[t.boneIndex];if(!l.active)return;let c=t.frames,d=0,f=0;if(i<c[0])switch(h){case 0:l.rotation=l.data.rotation;default:return;case 1:d=l.rotation,f=l.data.rotation}else d=h==0?l.data.rotation:l.rotation,f=l.data.rotation+t.getCurveValue(i);let m=0,u=f-d;if(u-=Math.ceil(u/360-.5)*360,u==0)m=o[a];else{let x=0,w=0;n?(x=0,w=u):(x=o[a],w=o[a+1]);let p=x-x%360;m=u+p;let g=u>=0,b=x>=0;Math.abs(w)<=90&&R.signum(w)!=R.signum(u)&&(Math.abs(x-p)>180?(m+=360*R.signum(x),b=g):p!=0?m-=360*R.signum(x):b=g),b!=g&&(m+=360*R.signum(x)),o[a]=m}o[a+1]=u,l.rotation=d+m*r}queueEvents(t,s){let i=t.animationStart,r=t.animationEnd,h=r-i,o=t.trackLast%h,a=this.events,n=0,l=a.length;for(;n<l;n++){let d=a[n];if(d.time<o)break;d.time>r||this.queue.event(t,d)}let c=!1;if(t.loop)if(h==0)c=!0;else{const d=Math.floor(t.trackTime/h);c=d>0&&d>Math.floor(t.trackLast/h)}else c=s>=r&&t.animationLast<r;for(c&&this.queue.complete(t);n<l;n++){let d=a[n];d.time<i||this.queue.event(t,d)}}clearTracks(){let t=this.queue.drainDisabled;this.queue.drainDisabled=!0;for(let s=0,i=this.tracks.length;s<i;s++)this.clearTrack(s);this.tracks.length=0,this.queue.drainDisabled=t,this.queue.drain()}clearTrack(t){if(t>=this.tracks.length)return;let s=this.tracks[t];if(!s)return;this.queue.end(s),this.clearNext(s);let i=s;for(;;){let r=i.mixingFrom;if(!r)break;this.queue.end(r),i.mixingFrom=null,i.mixingTo=null,i=r}this.tracks[s.trackIndex]=null,this.queue.drain()}setCurrent(t,s,i){let r=this.expandToIndex(t);this.tracks[t]=s,s.previous=null,r&&(i&&this.queue.interrupt(r),s.mixingFrom=r,r.mixingTo=s,s.mixTime=0,r.mixingFrom&&r.mixDuration>0&&(s.interruptAlpha*=Math.min(1,r.mixTime/r.mixDuration)),r.timelinesRotation.length=0),this.queue.start(s)}setAnimation(t,s,i=!1){let r=this.data.skeletonData.findAnimation(s);if(!r)throw new Error("Animation not found: "+s);return this.setAnimationWith(t,r,i)}setAnimationWith(t,s,i=!1){if(!s)throw new Error("animation cannot be null.");let r=!0,h=this.expandToIndex(t);h&&(h.nextTrackLast==-1?(this.tracks[t]=h.mixingFrom,this.queue.interrupt(h),this.queue.end(h),this.clearNext(h),h=h.mixingFrom,r=!1):this.clearNext(h));let o=this.trackEntry(t,s,i,h);return this.setCurrent(t,o,r),this.queue.drain(),o}addAnimation(t,s,i=!1,r=0){let h=this.data.skeletonData.findAnimation(s);if(!h)throw new Error("Animation not found: "+s);return this.addAnimationWith(t,h,i,r)}addAnimationWith(t,s,i=!1,r=0){if(!s)throw new Error("animation cannot be null.");let h=this.expandToIndex(t);if(h)for(;h.next;)h=h.next;let o=this.trackEntry(t,s,i,h);return h?(h.next=o,o.previous=h,r<=0&&(r=Math.max(r+h.getTrackComplete()-o.mixDuration,0))):(this.setCurrent(t,o,!0),this.queue.drain(),r<0&&(r=0)),o.delay=r,o}setEmptyAnimation(t,s=0){let i=this.setAnimationWith(t,De.emptyAnimation(),!1);return i.mixDuration=s,i.trackEnd=s,i}addEmptyAnimation(t,s=0,i=0){let r=this.addAnimationWith(t,De.emptyAnimation(),!1,i);return i<=0&&(r.delay=Math.max(r.delay+r.mixDuration-s,0)),r.mixDuration=s,r.trackEnd=s,r}setEmptyAnimations(t=0){let s=this.queue.drainDisabled;this.queue.drainDisabled=!0;for(let i=0,r=this.tracks.length;i<r;i++){let h=this.tracks[i];h&&this.setEmptyAnimation(h.trackIndex,t)}this.queue.drainDisabled=s,this.queue.drain()}expandToIndex(t){return t<this.tracks.length?this.tracks[t]:(P.ensureArrayCapacity(this.tracks,t+1,null),this.tracks.length=t+1,null)}trackEntry(t,s,i,r){let h=this.trackEntryPool.obtain();return h.reset(),h.trackIndex=t,h.animation=s,h.loop=i,h.holdPrevious=!1,h.reverse=!1,h.shortestRotation=!1,h.eventThreshold=0,h.alphaAttachmentThreshold=0,h.mixAttachmentThreshold=0,h.mixDrawOrderThreshold=0,h.animationStart=0,h.animationEnd=s.duration,h.animationLast=-1,h.nextAnimationLast=-1,h.delay=0,h.trackTime=0,h.trackLast=-1,h.nextTrackLast=-1,h.trackEnd=Number.MAX_VALUE,h.timeScale=1,h.alpha=1,h.mixTime=0,h.mixDuration=r?this.data.getMix(r.animation,s):0,h.interruptAlpha=1,h.totalAlpha=0,h.mixBlend=2,h}clearNext(t){let s=t.next;for(;s;)this.queue.dispose(s),s=s.next;t.next=null}_animationsChanged(){this.animationsChanged=!1,this.propertyIDs.clear();let t=this.tracks;for(let s=0,i=t.length;s<i;s++){let r=t[s];if(r){for(;r.mixingFrom;)r=r.mixingFrom;do(!r.mixingTo||r.mixBlend!=3)&&this.computeHold(r),r=r.mixingTo;while(r)}}}computeHold(t){let s=t.mixingTo,i=t.animation.timelines,r=t.animation.timelines.length,h=t.timelineMode;h.length=r;let o=t.timelineHoldMix;o.length=0;let a=this.propertyIDs;if(s&&s.holdPrevious){for(let n=0;n<r;n++)h[n]=a.addAll(i[n].getPropertyIds())?Be:Ct;return}e:for(let n=0;n<r;n++){let l=i[n],c=l.getPropertyIds();if(!a.addAll(c))h[n]=Pe;else if(!s||l instanceof me||l instanceof we||l instanceof Re||!s.animation.hasTimeline(c))h[n]=St;else{for(let d=s.mixingTo;d;d=d.mixingTo)if(!d.animation.hasTimeline(c)){if(t.mixDuration>0){h[n]=ds,o[n]=d;continue e}break}h[n]=Be}}}getCurrent(t){return t>=this.tracks.length?null:this.tracks[t]}addListener(t){if(!t)throw new Error("listener cannot be null.");this.listeners.push(t)}removeListener(t){let s=this.listeners.indexOf(t);s>=0&&this.listeners.splice(s,1)}clearListeners(){this.listeners.length=0}clearListenerNotifications(){this.queue.clear()}},os=class{animation=null;previous=null;next=null;mixingFrom=null;mixingTo=null;listener=null;trackIndex=0;loop=!1;holdPrevious=!1;reverse=!1;shortestRotation=!1;eventThreshold=0;mixAttachmentThreshold=0;alphaAttachmentThreshold=0;mixDrawOrderThreshold=0;animationStart=0;animationEnd=0;animationLast=0;nextAnimationLast=0;delay=0;trackTime=0;trackLast=0;nextTrackLast=0;trackEnd=0;timeScale=0;alpha=0;mixTime=0;_mixDuration=0;interruptAlpha=0;totalAlpha=0;get mixDuration(){return this._mixDuration}set mixDuration(e){this._mixDuration=e}setMixDurationWithDelay(e,t){this._mixDuration=e,t<=0&&(this.previous!=null?t=Math.max(t+this.previous.getTrackComplete()-e,0):t=0),this.delay=t}mixBlend=2;timelineMode=new Array;timelineHoldMix=new Array;timelinesRotation=new Array;reset(){this.next=null,this.previous=null,this.mixingFrom=null,this.mixingTo=null,this.animation=null,this.listener=null,this.timelineMode.length=0,this.timelineHoldMix.length=0,this.timelinesRotation.length=0}getAnimationTime(){if(this.loop){let e=this.animationEnd-this.animationStart;return e==0?this.animationStart:this.trackTime%e+this.animationStart}return Math.min(this.trackTime+this.animationStart,this.animationEnd)}setAnimationLast(e){this.animationLast=e,this.nextAnimationLast=e}isComplete(){return this.trackTime>=this.animationEnd-this.animationStart}resetRotationDirections(){this.timelinesRotation.length=0}getTrackComplete(){let e=this.animationEnd-this.animationStart;if(e!=0){if(this.loop)return e*(1+(this.trackTime/e|0));if(this.trackTime<e)return e}return this.trackTime}wasApplied(){return this.nextTrackLast!=-1}isNextReady(){return this.next!=null&&this.nextTrackLast-this.next.delay>=0}},hs=class{objects=[];drainDisabled=!1;animState;constructor(e){this.animState=e}start(e){this.objects.push(0),this.objects.push(e),this.animState.animationsChanged=!0}interrupt(e){this.objects.push(1),this.objects.push(e)}end(e){this.objects.push(2),this.objects.push(e),this.animState.animationsChanged=!0}dispose(e){this.objects.push(3),this.objects.push(e)}complete(e){this.objects.push(4),this.objects.push(e)}event(e,t){this.objects.push(5),this.objects.push(e),this.objects.push(t)}drain(){if(this.drainDisabled)return;this.drainDisabled=!0;let e=this.objects;for(let t=0;t<e.length;t+=2){let s=e[t],i=e[t+1],r=this.animState.listeners.slice();switch(s){case 0:i.listener&&i.listener.start&&i.listener.start(i);for(let o=0;o<r.length;o++){let a=r[o];a.start&&a.start(i)}break;case 1:i.listener&&i.listener.interrupt&&i.listener.interrupt(i);for(let o=0;o<r.length;o++){let a=r[o];a.interrupt&&a.interrupt(i)}break;case 2:i.listener&&i.listener.end&&i.listener.end(i);for(let o=0;o<r.length;o++){let a=r[o];a.end&&a.end(i)}case 3:i.listener&&i.listener.dispose&&i.listener.dispose(i);for(let o=0;o<r.length;o++){let a=r[o];a.dispose&&a.dispose(i)}this.animState.trackEntryPool.free(i);break;case 4:i.listener&&i.listener.complete&&i.listener.complete(i);for(let o=0;o<r.length;o++){let a=r[o];a.complete&&a.complete(i)}break;case 5:let h=e[t+++2];i.listener&&i.listener.event&&i.listener.event(i,h);for(let o=0;o<r.length;o++){let a=r[o];a.event&&a.event(i,h)}break}}this.clear(),this.drainDisabled=!1}clear(){this.objects.length=0}},cs=(e=>(e[e.start=0]="start",e[e.interrupt=1]="interrupt",e[e.end=2]="end",e[e.dispose=3]="dispose",e[e.complete=4]="complete",e[e.event=5]="event",e))(cs||{}),zs=class{start(e){}interrupt(e){}end(e){}dispose(e){}complete(e){}event(e,t){}},Pe=0,St=1,Ct=2,Be=3,ds=4,It=1,fs=2,_s=class{skeletonData;animationToMixTime={};defaultMix=0;constructor(e){if(!e)throw new Error("skeletonData cannot be null.");this.skeletonData=e}setMix(e,t,s){let i=this.skeletonData.findAnimation(e);if(!i)throw new Error("Animation not found: "+e);let r=this.skeletonData.findAnimation(t);if(!r)throw new Error("Animation not found: "+t);this.setMixWith(i,r,s)}setMixWith(e,t,s){if(!e)throw new Error("from cannot be null.");if(!t)throw new Error("to cannot be null.");let i=e.name+"."+t.name;this.animationToMixTime[i]=s}getMix(e,t){let s=e.name+"."+t.name,i=this.animationToMixTime[s];return i===void 0?this.defaultMix:i}},kt=class Rs extends oe{color=new D(1,1,1,1);constructor(t){super(t)}copy(){let t=new Rs(this.name);return this.copyTo(t),t.color.setFromColor(this.color),t}},Tt=class Ps extends oe{endSlot=null;color=new D(.2275,.2275,.8078,1);constructor(t){super(t)}copy(){let t=new Ps(this.name);return this.copyTo(t),t.endSlot=this.endSlot,t.color.setFromColor(this.color),t}},Yt=class{_image;constructor(e){this._image=e}getImage(){return this._image}},Ve=(e=>(e[e.Nearest=9728]="Nearest",e[e.Linear=9729]="Linear",e[e.MipMap=9987]="MipMap",e[e.MipMapNearestNearest=9984]="MipMapNearestNearest",e[e.MipMapLinearNearest=9985]="MipMapLinearNearest",e[e.MipMapNearestLinear=9986]="MipMapNearestLinear",e[e.MipMapLinearLinear=9987]="MipMapLinearLinear",e))(Ve||{}),us=(e=>(e[e.MirroredRepeat=33648]="MirroredRepeat",e[e.ClampToEdge=33071]="ClampToEdge",e[e.Repeat=10497]="Repeat",e))(us||{}),ms=class{texture;u=0;v=0;u2=0;v2=0;width=0;height=0;degrees=0;offsetX=0;offsetY=0;originalWidth=0;originalHeight=0},Gs=class extends Yt{setFilters(e,t){}setWraps(e,t){}dispose(){}},Mt=class{pages=new Array;regions=new Array;constructor(e){let t=new $s(e),s=new Array(4),i={};i.size=l=>{l.width=parseInt(s[1]),l.height=parseInt(s[2])},i.format=()=>{},i.filter=l=>{l.minFilter=P.enumValue(Ve,s[1]),l.magFilter=P.enumValue(Ve,s[2])},i.repeat=l=>{s[1].indexOf("x")!=-1&&(l.uWrap=10497),s[1].indexOf("y")!=-1&&(l.vWrap=10497)},i.pma=l=>{l.pma=s[1]=="true"};var r={};r.xy=l=>{l.x=parseInt(s[1]),l.y=parseInt(s[2])},r.size=l=>{l.width=parseInt(s[1]),l.height=parseInt(s[2])},r.bounds=l=>{l.x=parseInt(s[1]),l.y=parseInt(s[2]),l.width=parseInt(s[3]),l.height=parseInt(s[4])},r.offset=l=>{l.offsetX=parseInt(s[1]),l.offsetY=parseInt(s[2])},r.orig=l=>{l.originalWidth=parseInt(s[1]),l.originalHeight=parseInt(s[2])},r.offsets=l=>{l.offsetX=parseInt(s[1]),l.offsetY=parseInt(s[2]),l.originalWidth=parseInt(s[3]),l.originalHeight=parseInt(s[4])},r.rotate=l=>{let c=s[1];c=="true"?l.degrees=90:c!="false"&&(l.degrees=parseInt(c))},r.index=l=>{l.index=parseInt(s[1])};let h=t.readLine();for(;h&&h.trim().length==0;)h=t.readLine();for(;!(!h||h.trim().length==0||t.readEntry(s,h)==0);)h=t.readLine();let o=null,a=null,n=null;for(;h!==null;)if(h.trim().length==0)o=null,h=t.readLine();else if(o){let l=new Xt(o,h);for(;;){let c=t.readEntry(s,h=t.readLine());if(c==0)break;let d=r[s[0]];if(d)d(l);else{a||(a=[]),n||(n=[]),a.push(s[0]);let f=[];for(let m=0;m<c;m++)f.push(parseInt(s[m+1]));n.push(f)}}l.originalWidth==0&&l.originalHeight==0&&(l.originalWidth=l.width,l.originalHeight=l.height),a&&a.length>0&&n&&n.length>0&&(l.names=a,l.values=n,a=null,n=null),l.u=l.x/o.width,l.v=l.y/o.height,l.degrees==90?(l.u2=(l.x+l.height)/o.width,l.v2=(l.y+l.width)/o.height):(l.u2=(l.x+l.width)/o.width,l.v2=(l.y+l.height)/o.height),this.regions.push(l)}else{for(o=new gs(h.trim());t.readEntry(s,h=t.readLine())!=0;){let l=i[s[0]];l&&l(o)}this.pages.push(o)}}findRegion(e){for(let t=0;t<this.regions.length;t++)if(this.regions[t].name==e)return this.regions[t];return null}setTextures(e,t=""){for(let s of this.pages)s.setTexture(e.get(t+s.name))}dispose(){for(let e=0;e<this.pages.length;e++)this.pages[e].texture?.dispose()}},$s=class{lines;index=0;constructor(e){this.lines=e.split(/\r\n|\r|\n/)}readLine(){return this.index>=this.lines.length?null:this.lines[this.index++]}readEntry(e,t){if(!t||(t=t.trim(),t.length==0))return 0;let s=t.indexOf(":");if(s==-1)return 0;e[0]=t.substr(0,s).trim();for(let i=1,r=s+1;;i++){let h=t.indexOf(",",r);if(h==-1)return e[i]=t.substr(r).trim(),i;if(e[i]=t.substr(r,h-r).trim(),r=h+1,i==4)return 4}}},gs=class{name;minFilter=9728;magFilter=9728;uWrap=33071;vWrap=33071;texture=null;width=0;height=0;pma=!1;regions=new Array;constructor(e){this.name=e}setTexture(e){this.texture=e,e.setFilters(this.minFilter,this.magFilter),e.setWraps(this.uWrap,this.vWrap);for(let t of this.regions)t.texture=e}},Xt=class extends ms{page;name;x=0;y=0;offsetX=0;offsetY=0;originalWidth=0;originalHeight=0;index=0;degrees=0;names=null;values=null;constructor(e,t){super(),this.page=e,this.name=t,e.regions.push(this)}},Ce=class Ht extends oe{region=null;path;regionUVs=[];uvs=[];triangles=[];color=new D(1,1,1,1);width=0;height=0;hullLength=0;edges=[];parentMesh=null;sequence=null;tempColor=new D(0,0,0,0);constructor(t,s){super(t),this.path=s}updateRegion(){if(!this.region)throw new Error("Region not set.");let t=this.regionUVs;(!this.uvs||this.uvs.length!=t.length)&&(this.uvs=P.newFloatArray(t.length));let s=this.uvs,i=this.uvs.length,r=this.region.u,h=this.region.v,o=0,a=0;if(this.region instanceof Xt){let n=this.region,l=n.page,c=l.width,d=l.height;switch(n.degrees){case 90:r-=(n.originalHeight-n.offsetY-n.height)/c,h-=(n.originalWidth-n.offsetX-n.width)/d,o=n.originalHeight/c,a=n.originalWidth/d;for(let f=0;f<i;f+=2)s[f]=r+t[f+1]*o,s[f+1]=h+(1-t[f])*a;return;case 180:r-=(n.originalWidth-n.offsetX-n.width)/c,h-=n.offsetY/d,o=n.originalWidth/c,a=n.originalHeight/d;for(let f=0;f<i;f+=2)s[f]=r+(1-t[f])*o,s[f+1]=h+(1-t[f+1])*a;return;case 270:r-=n.offsetY/c,h-=n.offsetX/d,o=n.originalHeight/c,a=n.originalWidth/d;for(let f=0;f<i;f+=2)s[f]=r+(1-t[f+1])*o,s[f+1]=h+t[f]*a;return}r-=n.offsetX/c,h-=(n.originalHeight-n.offsetY-n.height)/d,o=n.originalWidth/c,a=n.originalHeight/d}else this.region?(o=this.region.u2-r,a=this.region.v2-h):(r=h=0,o=a=1);for(let n=0;n<i;n+=2)s[n]=r+t[n]*o,s[n+1]=h+t[n+1]*a}getParentMesh(){return this.parentMesh}setParentMesh(t){this.parentMesh=t,t&&(this.bones=t.bones,this.vertices=t.vertices,this.worldVerticesLength=t.worldVerticesLength,this.regionUVs=t.regionUVs,this.triangles=t.triangles,this.hullLength=t.hullLength,this.worldVerticesLength=t.worldVerticesLength)}copy(){if(this.parentMesh)return this.newLinkedMesh();let t=new Ht(this.name,this.path);return t.region=this.region,t.color.setFromColor(this.color),this.copyTo(t),t.regionUVs=new Array(this.regionUVs.length),P.arrayCopy(this.regionUVs,0,t.regionUVs,0,this.regionUVs.length),t.uvs=this.uvs instanceof Float32Array?P.newFloatArray(this.uvs.length):new Array(this.uvs.length),P.arrayCopy(this.uvs,0,t.uvs,0,this.uvs.length),t.triangles=new Array(this.triangles.length),P.arrayCopy(this.triangles,0,t.triangles,0,this.triangles.length),t.hullLength=this.hullLength,t.sequence=this.sequence!=null?this.sequence.copy():null,this.edges&&(t.edges=new Array(this.edges.length),P.arrayCopy(this.edges,0,t.edges,0,this.edges.length)),t.width=this.width,t.height=this.height,t}computeWorldVertices(t,s,i,r,h,o){this.sequence!=null&&this.sequence.apply(t,this),super.computeWorldVertices(t,s,i,r,h,o)}newLinkedMesh(){let t=new Ht(this.name,this.path);return t.region=this.region,t.color.setFromColor(this.color),t.timelineAttachment=this.timelineAttachment,t.setParentMesh(this.parentMesh?this.parentMesh:this),t.region!=null&&t.updateRegion(),t}},Ie=class Bs extends oe{lengths=[];closed=!1;constantSpeed=!1;color=new D(1,1,1,1);constructor(t){super(t)}copy(){let t=new Bs(this.name);return this.copyTo(t),t.lengths=new Array(this.lengths.length),P.arrayCopy(this.lengths,0,t.lengths,0,this.lengths.length),t.closed=closed,t.constantSpeed=this.constantSpeed,t.color.setFromColor(this.color),t}},xs=class Vs extends oe{x=0;y=0;rotation=0;color=new D(.38,.94,0,1);constructor(t){super(t)}computeWorldPosition(t,s){return s.x=this.x*t.a+this.y*t.b+t.worldX,s.y=this.x*t.c+this.y*t.d+t.worldY,s}computeWorldRotation(t){const s=this.rotation*R.degRad,i=Math.cos(s),r=Math.sin(s),h=i*t.a+r*t.b,o=i*t.c+r*t.d;return R.atan2Deg(o,h)}copy(){let t=new Vs(this.name);return t.x=this.x,t.y=this.y,t.rotation=this.rotation,t.color.setFromColor(this.color),t}},H=class Ls extends Ge{x=0;y=0;scaleX=1;scaleY=1;rotation=0;width=0;height=0;color=new D(1,1,1,1);path;region=null;sequence=null;offset=P.newFloatArray(8);uvs=P.newFloatArray(8);tempColor=new D(1,1,1,1);constructor(t,s){super(t),this.path=s}updateRegion(){if(!this.region)throw new Error("Region not set.");let t=this.region,s=this.uvs;if(t==null){s[0]=0,s[1]=0,s[2]=0,s[3]=1,s[4]=1,s[5]=1,s[6]=1,s[7]=0;return}let i=this.width/this.region.originalWidth*this.scaleX,r=this.height/this.region.originalHeight*this.scaleY,h=-this.width/2*this.scaleX+this.region.offsetX*i,o=-this.height/2*this.scaleY+this.region.offsetY*r,a=h+this.region.width*i,n=o+this.region.height*r,l=this.rotation*R.degRad,c=Math.cos(l),d=Math.sin(l),f=this.x,m=this.y,u=h*c+f,x=h*d,w=o*c+m,p=o*d,g=a*c+f,b=a*d,y=n*c+m,v=n*d,A=this.offset;A[0]=u-p,A[1]=w+x,A[2]=u-v,A[3]=y+x,A[4]=g-v,A[5]=y+b,A[6]=g-p,A[7]=w+b,t.degrees==90?(s[0]=t.u2,s[1]=t.v2,s[2]=t.u,s[3]=t.v2,s[4]=t.u,s[5]=t.v,s[6]=t.u2,s[7]=t.v):(s[0]=t.u,s[1]=t.v2,s[2]=t.u,s[3]=t.v,s[4]=t.u2,s[5]=t.v,s[6]=t.u2,s[7]=t.v2)}computeWorldVertices(t,s,i,r){this.sequence!=null&&this.sequence.apply(t,this);let h=t.bone,o=this.offset,a=h.worldX,n=h.worldY,l=h.a,c=h.b,d=h.c,f=h.d,m=0,u=0;m=o[0],u=o[1],s[i]=m*l+u*c+a,s[i+1]=m*d+u*f+n,i+=r,m=o[2],u=o[3],s[i]=m*l+u*c+a,s[i+1]=m*d+u*f+n,i+=r,m=o[4],u=o[5],s[i]=m*l+u*c+a,s[i+1]=m*d+u*f+n,i+=r,m=o[6],u=o[7],s[i]=m*l+u*c+a,s[i+1]=m*d+u*f+n}copy(){let t=new Ls(this.name,this.path);return t.region=this.region,t.x=this.x,t.y=this.y,t.scaleX=this.scaleX,t.scaleY=this.scaleY,t.rotation=this.rotation,t.width=this.width,t.height=this.height,P.arrayCopy(this.uvs,0,t.uvs,0,8),P.arrayCopy(this.offset,0,t.offset,0,8),t.color.setFromColor(this.color),t.sequence=this.sequence!=null?this.sequence.copy():null,t}static X1=0;static Y1=1;static C1R=2;static C1G=3;static C1B=4;static C1A=5;static U1=6;static V1=7;static X2=8;static Y2=9;static C2R=10;static C2G=11;static C2B=12;static C2A=13;static U2=14;static V2=15;static X3=16;static Y3=17;static C3R=18;static C3G=19;static C3B=20;static C3A=21;static U3=22;static V3=23;static X4=24;static Y4=25;static C4R=26;static C4G=27;static C4B=28;static C4A=29;static U4=30;static V4=31},Hs=class{atlas;constructor(e){this.atlas=e}loadSequence(e,t,s){let i=s.regions;for(let r=0,h=i.length;r<h;r++){let o=s.getPath(t,r),a=this.atlas.findRegion(o);if(a==null)throw new Error("Region not found in atlas: "+o+" (sequence: "+e+")");i[r]=a}}newRegionAttachment(e,t,s,i){let r=new H(t,s);if(i!=null)this.loadSequence(t,s,i);else{let h=this.atlas.findRegion(s);if(!h)throw new Error("Region not found in atlas: "+s+" (region attachment: "+t+")");r.region=h}return r}newMeshAttachment(e,t,s,i){let r=new Ce(t,s);if(i!=null)this.loadSequence(t,s,i);else{let h=this.atlas.findRegion(s);if(!h)throw new Error("Region not found in atlas: "+s+" (mesh attachment: "+t+")");r.region=h}return r}newBoundingBoxAttachment(e,t){return new kt(t)}newPathAttachment(e,t){return new Ie(t)}newPointAttachment(e,t){return new xs(t)}newClippingAttachment(e,t){return new Tt(t)}},Ft=class{index=0;name;parent=null;length=0;x=0;y=0;rotation=0;scaleX=1;scaleY=1;shearX=0;shearY=0;inherit=0;skinRequired=!1;color=new D;icon;visible=!1;constructor(e,t,s){if(e<0)throw new Error("index must be >= 0.");if(!t)throw new Error("name cannot be null.");this.index=e,this.name=t,this.parent=s}},Le=(e=>(e[e.Normal=0]="Normal",e[e.OnlyTranslation=1]="OnlyTranslation",e[e.NoRotationOrReflection=2]="NoRotationOrReflection",e[e.NoScale=3]="NoScale",e[e.NoScaleOrReflection=4]="NoScaleOrReflection",e))(Le||{}),Et=class{data;skeleton;parent=null;children=new Array;x=0;y=0;rotation=0;scaleX=0;scaleY=0;shearX=0;shearY=0;ax=0;ay=0;arotation=0;ascaleX=0;ascaleY=0;ashearX=0;ashearY=0;a=0;b=0;c=0;d=0;worldY=0;worldX=0;inherit=0;sorted=!1;active=!1;constructor(e,t,s){if(!e)throw new Error("data cannot be null.");if(!t)throw new Error("skeleton cannot be null.");this.data=e,this.skeleton=t,this.parent=s,this.setToSetupPose()}isActive(){return this.active}update(e){this.updateWorldTransformWith(this.ax,this.ay,this.arotation,this.ascaleX,this.ascaleY,this.ashearX,this.ashearY)}updateWorldTransform(){this.updateWorldTransformWith(this.x,this.y,this.rotation,this.scaleX,this.scaleY,this.shearX,this.shearY)}updateWorldTransformWith(e,t,s,i,r,h,o){this.ax=e,this.ay=t,this.arotation=s,this.ascaleX=i,this.ascaleY=r,this.ashearX=h,this.ashearY=o;let a=this.parent;if(!a){let f=this.skeleton;const m=f.scaleX,u=f.scaleY,x=(s+h)*R.degRad,w=(s+90+o)*R.degRad;this.a=Math.cos(x)*i*m,this.b=Math.cos(w)*r*m,this.c=Math.sin(x)*i*u,this.d=Math.sin(w)*r*u,this.worldX=e*m+f.x,this.worldY=t*u+f.y;return}let n=a.a,l=a.b,c=a.c,d=a.d;switch(this.worldX=n*e+l*t+a.worldX,this.worldY=c*e+d*t+a.worldY,this.inherit){case 0:{const f=(s+h)*R.degRad,m=(s+90+o)*R.degRad,u=Math.cos(f)*i,x=Math.cos(m)*r,w=Math.sin(f)*i,p=Math.sin(m)*r;this.a=n*u+l*w,this.b=n*x+l*p,this.c=c*u+d*w,this.d=c*x+d*p;return}case 1:{const f=(s+h)*R.degRad,m=(s+90+o)*R.degRad;this.a=Math.cos(f)*i,this.b=Math.cos(m)*r,this.c=Math.sin(f)*i,this.d=Math.sin(m)*r;break}case 2:{let f=1/this.skeleton.scaleX,m=1/this.skeleton.scaleY;n*=f,c*=m;let u=n*n+c*c,x=0;u>1e-4?(u=Math.abs(n*d*m-l*f*c)/u,l=c*u,d=n*u,x=Math.atan2(c,n)*R.radDeg):(n=0,c=0,x=90-Math.atan2(d,l)*R.radDeg);const w=(s+h-x)*R.degRad,p=(s+o-x+90)*R.degRad,g=Math.cos(w)*i,b=Math.cos(p)*r,y=Math.sin(w)*i,v=Math.sin(p)*r;this.a=n*g-l*y,this.b=n*b-l*v,this.c=c*g+d*y,this.d=c*b+d*v;break}case 3:case 4:{s*=R.degRad;const f=Math.cos(s),m=Math.sin(s);let u=(n*f+l*m)/this.skeleton.scaleX,x=(c*f+d*m)/this.skeleton.scaleY,w=Math.sqrt(u*u+x*x);w>1e-5&&(w=1/w),u*=w,x*=w,w=Math.sqrt(u*u+x*x),this.inherit==3&&n*d-l*c<0!=(this.skeleton.scaleX<0!=this.skeleton.scaleY<0)&&(w=-w),s=Math.PI/2+Math.atan2(x,u);const p=Math.cos(s)*w,g=Math.sin(s)*w;h*=R.degRad,o=(90+o)*R.degRad;const b=Math.cos(h)*i,y=Math.cos(o)*r,v=Math.sin(h)*i,A=Math.sin(o)*r;this.a=u*b+p*v,this.b=u*y+p*A,this.c=x*b+g*v,this.d=x*y+g*A;break}}this.a*=this.skeleton.scaleX,this.b*=this.skeleton.scaleX,this.c*=this.skeleton.scaleY,this.d*=this.skeleton.scaleY}setToSetupPose(){let e=this.data;this.x=e.x,this.y=e.y,this.rotation=e.rotation,this.scaleX=e.scaleX,this.scaleY=e.scaleY,this.shearX=e.shearX,this.shearY=e.shearY,this.inherit=e.inherit}updateAppliedTransform(){let e=this.parent;if(!e){this.ax=this.worldX-this.skeleton.x,this.ay=this.worldY-this.skeleton.y,this.arotation=Math.atan2(this.c,this.a)*R.radDeg,this.ascaleX=Math.sqrt(this.a*this.a+this.c*this.c),this.ascaleY=Math.sqrt(this.b*this.b+this.d*this.d),this.ashearX=0,this.ashearY=Math.atan2(this.a*this.b+this.c*this.d,this.a*this.d-this.b*this.c)*R.radDeg;return}let t=e.a,s=e.b,i=e.c,r=e.d,h=1/(t*r-s*i),o=r*h,a=s*h,n=i*h,l=t*h,c=this.worldX-e.worldX,d=this.worldY-e.worldY;this.ax=c*o-d*a,this.ay=d*l-c*n;let f,m,u,x;if(this.inherit==1)f=this.a,m=this.b,u=this.c,x=this.d;else{switch(this.inherit){case 2:{let y=Math.abs(t*r-s*i)/(t*t+i*i);s=-i*this.skeleton.scaleX*y/this.skeleton.scaleY,r=t*this.skeleton.scaleY*y/this.skeleton.scaleX,h=1/(t*r-s*i),o=r*h,a=s*h;break}case 3:case 4:let w=R.cosDeg(this.rotation),p=R.sinDeg(this.rotation);t=(t*w+s*p)/this.skeleton.scaleX,i=(i*w+r*p)/this.skeleton.scaleY;let g=Math.sqrt(t*t+i*i);g>1e-5&&(g=1/g),t*=g,i*=g,g=Math.sqrt(t*t+i*i),this.inherit==3&&h<0!=(this.skeleton.scaleX<0!=this.skeleton.scaleY<0)&&(g=-g);let b=R.PI/2+Math.atan2(i,t);s=Math.cos(b)*g,r=Math.sin(b)*g,h=1/(t*r-s*i),o=r*h,a=s*h,n=i*h,l=t*h}f=o*this.a-a*this.c,m=o*this.b-a*this.d,u=l*this.c-n*this.a,x=l*this.d-n*this.b}if(this.ashearX=0,this.ascaleX=Math.sqrt(f*f+u*u),this.ascaleX>1e-4){let w=f*x-m*u;this.ascaleY=w/this.ascaleX,this.ashearY=-Math.atan2(f*m+u*x,w)*R.radDeg,this.arotation=Math.atan2(u,f)*R.radDeg}else this.ascaleX=0,this.ascaleY=Math.sqrt(m*m+x*x),this.ashearY=0,this.arotation=90-Math.atan2(x,m)*R.radDeg}getWorldRotationX(){return Math.atan2(this.c,this.a)*R.radDeg}getWorldRotationY(){return Math.atan2(this.d,this.b)*R.radDeg}getWorldScaleX(){return Math.sqrt(this.a*this.a+this.c*this.c)}getWorldScaleY(){return Math.sqrt(this.b*this.b+this.d*this.d)}worldToLocal(e){let t=1/(this.a*this.d-this.b*this.c),s=e.x-this.worldX,i=e.y-this.worldY;return e.x=s*this.d*t-i*this.b*t,e.y=i*this.a*t-s*this.c*t,e}localToWorld(e){let t=e.x,s=e.y;return e.x=t*this.a+s*this.b+this.worldX,e.y=t*this.c+s*this.d+this.worldY,e}worldToParent(e){if(e==null)throw new Error("world cannot be null.");return this.parent==null?e:this.parent.worldToLocal(e)}parentToWorld(e){if(e==null)throw new Error("world cannot be null.");return this.parent==null?e:this.parent.localToWorld(e)}worldToLocalRotation(e){let t=R.sinDeg(e),s=R.cosDeg(e);return Math.atan2(this.a*t-this.c*s,this.d*s-this.b*t)*R.radDeg+this.rotation-this.shearX}localToWorldRotation(e){e-=this.rotation-this.shearX;let t=R.sinDeg(e),s=R.cosDeg(e);return Math.atan2(s*this.c+t*this.d,s*this.a+t*this.b)*R.radDeg}rotateWorld(e){e*=R.degRad;const t=Math.sin(e),s=Math.cos(e),i=this.a,r=this.b;this.a=s*i-t*this.c,this.b=s*r-t*this.d,this.c=t*i+s*this.c,this.d=t*r+s*this.d}},ke=class{constructor(e,t,s){this.name=e,this.order=t,this.skinRequired=s}},bs=class{pathPrefix="";textureLoader;downloader;cache;errors={};toLoad=0;loaded=0;constructor(e,t="",s=new Rt,i=new ws){this.textureLoader=e,this.pathPrefix=t,this.downloader=s,this.cache=i}start(e){return this.toLoad++,this.pathPrefix+e}success(e,t,s){this.toLoad--,this.loaded++,this.cache.assets[t]=s,this.cache.assetsRefCount[t]=(this.cache.assetsRefCount[t]||0)+1,e&&e(t,s)}error(e,t,s){this.toLoad--,this.loaded++,this.errors[t]=s,e&&e(t,s)}loadAll(){return new Promise((t,s)=>{let i=()=>{if(this.isLoadingComplete()){this.hasErrors()?s(this.errors):t(this);return}requestAnimationFrame(i)};requestAnimationFrame(i)})}setRawDataURI(e,t){this.downloader.rawDataUris[this.pathPrefix+e]=t}loadBinary(e,t=()=>{},s=()=>{}){e=this.start(e),!this.reuseAssets(e,t,s)&&(this.cache.assetsLoaded[e]=new Promise((i,r)=>{this.downloader.downloadBinary(e,h=>{this.success(t,e,h),i(h)},(h,o)=>{const a=`Couldn't load binary ${e}: status ${h}, ${o}`;this.error(s,e,a),r(a)})}))}loadText(e,t=()=>{},s=()=>{}){e=this.start(e),this.downloader.downloadText(e,i=>{this.success(t,e,i)},(i,r)=>{this.error(s,e,`Couldn't load text ${e}: status ${i}, ${r}`)})}loadJson(e,t=()=>{},s=()=>{}){e=this.start(e),!this.reuseAssets(e,t,s)&&(this.cache.assetsLoaded[e]=new Promise((i,r)=>{this.downloader.downloadJson(e,h=>{this.success(t,e,h),i(h)},(h,o)=>{const a=`Couldn't load JSON ${e}: status ${h}, ${o}`;this.error(s,e,a),r(a)})}))}reuseAssets(e,t=()=>{},s=()=>{}){const i=this.cache.assetsLoaded[e],r=i!==void 0;return r&&(this.cache.assetsLoaded[e]=i.then(h=>(h=h instanceof Image||h instanceof ImageBitmap?this.textureLoader(h):h,this.success(t,e,h),h)).catch(h=>this.error(s,e,h))),r}loadTexture(e,t=()=>{},s=()=>{}){e=this.start(e),!this.reuseAssets(e,t,s)&&(this.cache.assetsLoaded[e]=new Promise((i,r)=>{if(!!!(typeof window<"u"&&typeof navigator<"u"&&window.document))fetch(e,{mode:"cors"}).then(a=>{if(a.ok)return a.blob();const n=`Couldn't load image: ${e}`;this.error(s,e,`Couldn't load image: ${e}`),r(n)}).then(a=>a?createImageBitmap(a,{premultiplyAlpha:"none",colorSpaceConversion:"none"}):null).then(a=>{if(a){const n=this.createTexture(e,a);this.success(t,e,n),i(n)}});else{let a=new Image;a.crossOrigin="anonymous",a.onload=()=>{const n=this.createTexture(e,a);this.success(t,e,n),i(n)},a.onerror=()=>{const n=`Couldn't load image: ${e}`;this.error(s,e,n),r(n)},this.downloader.rawDataUris[e]&&(e=this.downloader.rawDataUris[e]),a.src=e}}))}loadTextureAtlas(e,t=()=>{},s=()=>{},i){let r=e.lastIndexOf("/"),h=r>=0?e.substring(0,r+1):"";e=this.start(e),!this.reuseAssets(e,t,s)&&(this.cache.assetsLoaded[e]=new Promise((o,a)=>{this.downloader.downloadText(e,n=>{try{const l=this.createTextureAtlas(e,n);let c=l.pages.length,d=!1;if(c===0){this.success(t,e,l),o(l);return}for(let f of l.pages)this.loadTexture(i?i[f.name]:h+f.name,(m,u)=>{d||(f.setTexture(u),--c==0&&(this.success(t,e,l),o(l)))},(m,u)=>{if(!d){const x=`Couldn't load texture ${e} page image: ${m}`;this.error(s,e,x),a(x)}d=!0})}catch(l){const c=`Couldn't parse texture atlas ${e}: ${l.message}`;this.error(s,e,c),a(c)}},(n,l)=>{const c=`Couldn't load texture atlas ${e}: status ${n}, ${l}`;this.error(s,e,c),a(c)})}))}loadTextureAtlasButNoTextures(e,t=()=>{},s=()=>{},i){e=this.start(e),!this.reuseAssets(e,t,s)&&(this.cache.assetsLoaded[e]=new Promise((r,h)=>{this.downloader.downloadText(e,o=>{try{const a=this.createTextureAtlas(e,o);this.success(t,e,a),r(a)}catch(a){const n=`Couldn't parse texture atlas ${e}: ${a.message}`;this.error(s,e,n),h(n)}},(o,a)=>{const n=`Couldn't load texture atlas ${e}: status ${o}, ${a}`;this.error(s,e,n),h(n)})}))}async loadBinaryAsync(e){return new Promise((t,s)=>{this.loadBinary(e,(i,r)=>t(r),(i,r)=>s(r))})}async loadJsonAsync(e){return new Promise((t,s)=>{this.loadJson(e,(i,r)=>t(r),(i,r)=>s(r))})}async loadTextureAsync(e){return new Promise((t,s)=>{this.loadTexture(e,(i,r)=>t(r),(i,r)=>s(r))})}async loadTextureAtlasAsync(e){return new Promise((t,s)=>{this.loadTextureAtlas(e,(i,r)=>t(r),(i,r)=>s(r))})}async loadTextureAtlasButNoTexturesAsync(e){return new Promise((t,s)=>{this.loadTextureAtlasButNoTextures(e,(i,r)=>t(r),(i,r)=>s(r))})}setCache(e){this.cache=e}get(e){return this.cache.assets[this.pathPrefix+e]}require(e){e=this.pathPrefix+e;let t=this.cache.assets[e];if(t)return t;let s=this.errors[e];throw Error("Asset not found: "+e+(s?`
`+s:""))}remove(e){e=this.pathPrefix+e;let t=this.cache.assets[e];return t.dispose&&t.dispose(),delete this.cache.assets[e],delete this.cache.assetsRefCount[e],delete this.cache.assetsLoaded[e],t}removeAll(){for(let e in this.cache.assets){let t=this.cache.assets[e];t.dispose&&t.dispose()}this.cache.assets={},this.cache.assetsLoaded={},this.cache.assetsRefCount={}}isLoadingComplete(){return this.toLoad==0}getToLoad(){return this.toLoad}getLoaded(){return this.loaded}dispose(){this.removeAll()}disposeAsset(e){const t=this.cache.assets[e];if(t instanceof Mt){t.dispose();return}this.disposeAssetInternal(e)}hasErrors(){return Object.keys(this.errors).length>0}getErrors(){return this.errors}disposeAssetInternal(e){if(this.cache.assetsRefCount[e]>0&&--this.cache.assetsRefCount[e]===0)return this.remove(e)}createTextureAtlas(e,t){const s=new Mt(t);return s.dispose=()=>{if(!(this.cache.assetsRefCount[e]<=0)){this.disposeAssetInternal(e);for(const i of s.pages)i.texture?.dispose()}},s}createTexture(e,t){const s=this.textureLoader(t),i=s.dispose.bind(s);return s.dispose=()=>{this.disposeAssetInternal(e)&&i()},s}},ws=class qe{assets={};assetsRefCount={};assetsLoaded={};static AVAILABLE_CACHES=new Map;static getCache(t){const s=qe.AVAILABLE_CACHES.get(t);if(s)return s;const i=new qe;return qe.AVAILABLE_CACHES.set(t,i),i}async addAsset(t,s){this.assetsLoaded[t]=Promise.resolve(s),this.assets[t]=await s}},Rt=class{callbacks={};rawDataUris={};dataUriToString(e){if(!e.startsWith("data:"))throw new Error("Not a data URI.");let t=e.indexOf("base64,");return t!=-1?(t+=7,atob(e.substr(t))):e.substr(e.indexOf(",")+1)}base64ToUint8Array(e){for(var t=window.atob(e),s=t.length,i=new Uint8Array(s),r=0;r<s;r++)i[r]=t.charCodeAt(r);return i}dataUriToUint8Array(e){if(!e.startsWith("data:"))throw new Error("Not a data URI.");let t=e.indexOf("base64,");if(t==-1)throw new Error("Not a binary data URI.");return t+=7,this.base64ToUint8Array(e.substr(t))}downloadText(e,t,s){if(this.start(e,t,s))return;const i=this.rawDataUris[e];if(i&&!i.includes(".")){try{this.finish(e,200,this.dataUriToString(i))}catch(o){this.finish(e,400,JSON.stringify(o))}return}let r=new XMLHttpRequest;r.overrideMimeType("text/html"),r.open("GET",i||e,!0);let h=()=>{this.finish(e,r.status,r.responseText)};r.onload=h,r.onerror=h,r.send()}downloadJson(e,t,s){this.downloadText(e,i=>{t(JSON.parse(i))},s)}downloadBinary(e,t,s){if(this.start(e,t,s))return;const i=this.rawDataUris[e];if(i&&!i.includes(".")){try{this.finish(e,200,this.dataUriToUint8Array(i))}catch(o){this.finish(e,400,JSON.stringify(o))}return}let r=new XMLHttpRequest;r.open("GET",i||e,!0),r.responseType="arraybuffer";let h=()=>{this.finish(e,r.status,r.response)};r.onload=()=>{r.status==200||r.status==0?this.finish(e,200,new Uint8Array(r.response)):h()},r.onerror=h,r.send()}start(e,t,s){let i=this.callbacks[e];try{if(i)return!0;this.callbacks[e]=i=[]}finally{i.push(t,s)}}finish(e,t,s){let i=this.callbacks[e];delete this.callbacks[e];let r=t==200||t==0?[s]:[t,s];for(let h=r.length-1,o=i.length;h<o;h+=2)i[h].apply(null,r)}},Pt=class{data;intValue=0;floatValue=0;stringValue=null;time=0;volume=0;balance=0;constructor(e,t){if(!t)throw new Error("data cannot be null.");this.time=e,this.data=t}},Bt=class{name;intValue=0;floatValue=0;stringValue=null;audioPath=null;volume=0;balance=0;constructor(e){this.name=e}},ps=class{data;bones;target;bendDirection=0;compress=!1;stretch=!1;mix=1;softness=0;active=!1;constructor(e,t){if(!e)throw new Error("data cannot be null.");if(!t)throw new Error("skeleton cannot be null.");this.data=e,this.bones=new Array;for(let i=0;i<e.bones.length;i++){let r=t.findBone(e.bones[i].name);if(!r)throw new Error(`Couldn't find bone ${e.bones[i].name}`);this.bones.push(r)}let s=t.findBone(e.target.name);if(!s)throw new Error(`Couldn't find bone ${e.target.name}`);this.target=s,this.mix=e.mix,this.softness=e.softness,this.bendDirection=e.bendDirection,this.compress=e.compress,this.stretch=e.stretch}isActive(){return this.active}setToSetupPose(){const e=this.data;this.mix=e.mix,this.softness=e.softness,this.bendDirection=e.bendDirection,this.compress=e.compress,this.stretch=e.stretch}update(e){if(this.mix==0)return;let t=this.target,s=this.bones;switch(s.length){case 1:this.apply1(s[0],t.worldX,t.worldY,this.compress,this.stretch,this.data.uniform,this.mix);break;case 2:this.apply2(s[0],s[1],t.worldX,t.worldY,this.bendDirection,this.stretch,this.data.uniform,this.softness,this.mix);break}}apply1(e,t,s,i,r,h,o){let a=e.parent;if(!a)throw new Error("IK bone must have parent.");let n=a.a,l=a.b,c=a.c,d=a.d,f=-e.ashearX-e.arotation,m=0,u=0;switch(e.inherit){case 1:m=(t-e.worldX)*R.signum(e.skeleton.scaleX),u=(s-e.worldY)*R.signum(e.skeleton.scaleY);break;case 2:let p=Math.abs(n*d-l*c)/Math.max(1e-4,n*n+c*c),g=n/e.skeleton.scaleX,b=c/e.skeleton.scaleY;l=-b*p*e.skeleton.scaleX,d=g*p*e.skeleton.scaleY,f+=Math.atan2(b,g)*R.radDeg;default:let y=t-a.worldX,v=s-a.worldY,A=n*d-l*c;Math.abs(A)<=1e-4?(m=0,u=0):(m=(y*d-v*l)/A-e.ax,u=(v*n-y*c)/A-e.ay)}f+=Math.atan2(u,m)*R.radDeg,e.ascaleX<0&&(f+=180),f>180?f-=360:f<-180&&(f+=360);let x=e.ascaleX,w=e.ascaleY;if(i||r){switch(e.inherit){case 3:case 4:m=t-e.worldX,u=s-e.worldY}const p=e.data.length*x;if(p>1e-4){const g=m*m+u*u;if(i&&g<p*p||r&&g>p*p){const b=(Math.sqrt(g)/p-1)*o+1;x*=b,h&&(w*=b)}}}e.updateWorldTransformWith(e.ax,e.ay,e.arotation+f*o,x,w,e.ashearX,e.ashearY)}apply2(e,t,s,i,r,h,o,a,n){if(e.inherit!=0||t.inherit!=0)return;let l=e.ax,c=e.ay,d=e.ascaleX,f=e.ascaleY,m=d,u=f,x=t.ascaleX,w=0,p=0,g=0;d<0?(d=-d,w=180,g=-1):(w=0,g=1),f<0&&(f=-f,g=-g),x<0?(x=-x,p=180):p=0;let b=t.ax,y=0,v=0,A=0,S=e.a,I=e.b,T=e.c,M=e.d,Y=Math.abs(d-f)<=1e-4;!Y||h?(y=0,v=S*b+e.worldX,A=T*b+e.worldY):(y=t.ay,v=S*b+I*y+e.worldX,A=T*b+M*y+e.worldY);let F=e.parent;if(!F)throw new Error("IK parent must itself have a parent.");S=F.a,I=F.b,T=F.c,M=F.d;let E=S*M-I*T,k=v-F.worldX,X=A-F.worldY;E=Math.abs(E)<=1e-4?0:1/E;let B=(k*M-X*I)*E-l,N=(X*S-k*T)*E-c,L=Math.sqrt(B*B+N*N),O=t.data.length*x,$,z;if(L<1e-4){this.apply1(e,s,i,!1,h,!1,n),t.updateWorldTransformWith(b,y,0,t.ascaleX,t.ascaleY,t.ashearX,t.ashearY);return}k=s-F.worldX,X=i-F.worldY;let j=(k*M-X*I)*E-l,V=(X*S-k*T)*E-c,W=j*j+V*V;if(a!=0){a*=d*(x+1)*.5;let K=Math.sqrt(W),Q=K-L-O*d+a;if(Q>0){let Z=Math.min(1,Q/(a*2))-1;Z=(Q-a*(1-Z*Z))/K,j-=Z*j,V-=Z*V,W=j*j+V*V}}e:if(Y){O*=d;let K=(W-L*L-O*O)/(2*L*O);K<-1?(K=-1,z=Math.PI*r):K>1?(K=1,z=0,h&&(S=(Math.sqrt(W)/(L+O)-1)*n+1,m*=S,o&&(u*=S))):z=Math.acos(K)*r,S=L+O*K,I=O*Math.sin(z),$=Math.atan2(V*S-j*I,j*S+V*I)}else{S=d*O,I=f*O;let K=S*S,Q=I*I,Z=Math.atan2(V,j);T=Q*L*L+K*W-K*Q;let re=-2*Q*L,xe=Q-K;if(M=re*re-4*xe*T,M>=0){let be=Math.sqrt(M);re<0&&(be=-be),be=-(re+be)*.5;let ve=be/xe,es=T/be,Me=Math.abs(ve)<Math.abs(es)?ve:es;if(ve=W-Me*Me,ve>=0){X=Math.sqrt(ve)*r,$=Z-Math.atan2(X,Me),z=Math.atan2(X/f,(Me-L)/d);break e}}let ye=R.PI,Te=L-S,Ue=Te*Te,Kt=0,Qt=0,Ye=L+S,ze=Ye*Ye,Zt=0;T=-S*L/(K-Q),T>=-1&&T<=1&&(T=Math.acos(T),k=S*Math.cos(T)+L,X=I*Math.sin(T),M=k*k+X*X,M<Ue&&(ye=T,Ue=M,Te=k,Kt=X),M>ze&&(Qt=T,ze=M,Ye=k,Zt=X)),W<=(Ue+ze)*.5?($=Z-Math.atan2(Kt*r,Te),z=ye*r):($=Z-Math.atan2(Zt*r,Ye),z=Qt*r)}let G=Math.atan2(y,b)*g,te=e.arotation;$=($-G)*R.radDeg+w-te,$>180?$-=360:$<-180&&($+=360),e.updateWorldTransformWith(l,c,te+$*n,m,u,0,0),te=t.arotation,z=((z+G)*R.radDeg-t.ashearX)*g+p-te,z>180?z-=360:z<-180&&(z+=360),t.updateWorldTransformWith(b,y,te+z*n,t.ascaleX,t.ascaleY,t.ashearX,t.ashearY)}},Vt=class extends ke{bones=new Array;_target=null;set target(e){this._target=e}get target(){if(this._target)return this._target;throw new Error("BoneData not set.")}bendDirection=0;compress=!1;stretch=!1;uniform=!1;mix=0;softness=0;constructor(e){super(e,0,!1)}},Lt=class extends ke{bones=new Array;_target=null;set target(e){this._target=e}get target(){if(this._target)return this._target;throw new Error("SlotData not set.")}positionMode=0;spacingMode=1;rotateMode=1;offsetRotation=0;position=0;spacing=0;mixRotate=0;mixX=0;mixY=0;constructor(e){super(e,0,!1)}},Nt=(e=>(e[e.Fixed=0]="Fixed",e[e.Percent=1]="Percent",e))(Nt||{}),Ot=(e=>(e[e.Length=0]="Length",e[e.Fixed=1]="Fixed",e[e.Percent=2]="Percent",e[e.Proportional=3]="Proportional",e))(Ot||{}),Dt=(e=>(e[e.Tangent=0]="Tangent",e[e.Chain=1]="Chain",e[e.ChainScale=2]="ChainScale",e))(Dt||{}),ys=class ue{static NONE=-1;static BEFORE=-2;static AFTER=-3;static epsilon=1e-5;data;bones;target;position=0;spacing=0;mixRotate=0;mixX=0;mixY=0;spaces=new Array;positions=new Array;world=new Array;curves=new Array;lengths=new Array;segments=new Array;active=!1;constructor(t,s){if(!t)throw new Error("data cannot be null.");if(!s)throw new Error("skeleton cannot be null.");this.data=t,this.bones=new Array;for(let r=0,h=t.bones.length;r<h;r++){let o=s.findBone(t.bones[r].name);if(!o)throw new Error(`Couldn't find bone ${t.bones[r].name}.`);this.bones.push(o)}let i=s.findSlot(t.target.name);if(!i)throw new Error(`Couldn't find target bone ${t.target.name}`);this.target=i,this.position=t.position,this.spacing=t.spacing,this.mixRotate=t.mixRotate,this.mixX=t.mixX,this.mixY=t.mixY}isActive(){return this.active}setToSetupPose(){const t=this.data;this.position=t.position,this.spacing=t.spacing,this.mixRotate=t.mixRotate,this.mixX=t.mixX,this.mixY=t.mixY}update(t){let s=this.target.getAttachment();if(!(s instanceof Ie))return;let i=this.mixRotate,r=this.mixX,h=this.mixY;if(i==0&&r==0&&h==0)return;let o=this.data,a=o.rotateMode==0,n=o.rotateMode==2,l=this.bones,c=l.length,d=a?c:c+1,f=P.setArraySize(this.spaces,d),m=n?this.lengths=P.setArraySize(this.lengths,c):[],u=this.spacing;switch(o.spacingMode){case 2:if(n)for(let A=0,S=d-1;A<S;A++){let I=l[A],T=I.data.length,M=T*I.a,Y=T*I.c;m[A]=Math.sqrt(M*M+Y*Y)}P.arrayFill(f,1,d,u);break;case 3:let y=0;for(let A=0,S=d-1;A<S;){let I=l[A],T=I.data.length;if(T<ue.epsilon)n&&(m[A]=0),f[++A]=u;else{let M=T*I.a,Y=T*I.c,F=Math.sqrt(M*M+Y*Y);n&&(m[A]=F),f[++A]=F,y+=F}}if(y>0){y=d/y*u;for(let A=1;A<d;A++)f[A]*=y}break;default:let v=o.spacingMode==0;for(let A=0,S=d-1;A<S;){let I=l[A],T=I.data.length;if(T<ue.epsilon)n&&(m[A]=0),f[++A]=u;else{let M=T*I.a,Y=T*I.c,F=Math.sqrt(M*M+Y*Y);n&&(m[A]=F),f[++A]=(v?T+u:u)*F/T}}}let x=this.computeWorldPositions(s,d,a),w=x[0],p=x[1],g=o.offsetRotation,b=!1;if(g==0)b=o.rotateMode==1;else{b=!1;let y=this.target.bone;g*=y.a*y.d-y.b*y.c>0?R.degRad:-R.degRad}for(let y=0,v=3;y<c;y++,v+=3){let A=l[y];A.worldX+=(w-A.worldX)*r,A.worldY+=(p-A.worldY)*h;let S=x[v],I=x[v+1],T=S-w,M=I-p;if(n){let Y=m[y];if(Y!=0){let F=(Math.sqrt(T*T+M*M)/Y-1)*i+1;A.a*=F,A.c*=F}}if(w=S,p=I,i>0){let Y=A.a,F=A.b,E=A.c,k=A.d,X=0,B=0,N=0;if(a?X=x[v-1]:f[y+1]==0?X=x[v+2]:X=Math.atan2(M,T),X-=Math.atan2(E,Y),b){B=Math.cos(X),N=Math.sin(X);let L=A.data.length;w+=(L*(B*Y-N*E)-T)*i,p+=(L*(N*Y+B*E)-M)*i}else X+=g;X>R.PI?X-=R.PI2:X<-R.PI&&(X+=R.PI2),X*=i,B=Math.cos(X),N=Math.sin(X),A.a=B*Y-N*E,A.b=B*F-N*k,A.c=N*Y+B*E,A.d=N*F+B*k}A.updateAppliedTransform()}}computeWorldPositions(t,s,i){let r=this.target,h=this.position,o=this.spaces,a=P.setArraySize(this.positions,s*3+2),n=this.world,l=t.closed,c=t.worldVerticesLength,d=c/6,f=ue.NONE;if(!t.constantSpeed){let L=t.lengths;d-=l?1:2;let O=L[d];this.data.positionMode==1&&(h*=O);let $;switch(this.data.spacingMode){case 2:$=O;break;case 3:$=O/s;break;default:$=1}n=P.setArraySize(this.world,8);for(let z=0,j=0,V=0;z<s;z++,j+=3){let W=o[z]*$;h+=W;let G=h;if(l)G%=O,G<0&&(G+=O),V=0;else if(G<0){f!=ue.BEFORE&&(f=ue.BEFORE,t.computeWorldVertices(r,2,4,n,0,2)),this.addBeforePosition(G,n,0,a,j);continue}else if(G>O){f!=ue.AFTER&&(f=ue.AFTER,t.computeWorldVertices(r,c-6,4,n,0,2)),this.addAfterPosition(G-O,n,0,a,j);continue}for(;;V++){let te=L[V];if(!(G>te)){if(V==0)G/=te;else{let K=L[V-1];G=(G-K)/(te-K)}break}}V!=f&&(f=V,l&&V==d?(t.computeWorldVertices(r,c-4,4,n,0,2),t.computeWorldVertices(r,0,4,n,4,2)):t.computeWorldVertices(r,V*6+2,8,n,0,2)),this.addCurvePosition(G,n[0],n[1],n[2],n[3],n[4],n[5],n[6],n[7],a,j,i||z>0&&W==0)}return a}l?(c+=2,n=P.setArraySize(this.world,c),t.computeWorldVertices(r,2,c-4,n,0,2),t.computeWorldVertices(r,0,2,n,c-4,2),n[c-2]=n[0],n[c-1]=n[1]):(d--,c-=4,n=P.setArraySize(this.world,c),t.computeWorldVertices(r,2,c,n,0,2));let m=P.setArraySize(this.curves,d),u=0,x=n[0],w=n[1],p=0,g=0,b=0,y=0,v=0,A=0,S=0,I=0,T=0,M=0,Y=0,F=0,E=0,k=0;for(let L=0,O=2;L<d;L++,O+=6)p=n[O],g=n[O+1],b=n[O+2],y=n[O+3],v=n[O+4],A=n[O+5],S=(x-p*2+b)*.1875,I=(w-g*2+y)*.1875,T=((p-b)*3-x+v)*.09375,M=((g-y)*3-w+A)*.09375,Y=S*2+T,F=I*2+M,E=(p-x)*.75+S+T*.16666667,k=(g-w)*.75+I+M*.16666667,u+=Math.sqrt(E*E+k*k),E+=Y,k+=F,Y+=T,F+=M,u+=Math.sqrt(E*E+k*k),E+=Y,k+=F,u+=Math.sqrt(E*E+k*k),E+=Y+T,k+=F+M,u+=Math.sqrt(E*E+k*k),m[L]=u,x=v,w=A;this.data.positionMode==1&&(h*=u);let X;switch(this.data.spacingMode){case 2:X=u;break;case 3:X=u/s;break;default:X=1}let B=this.segments,N=0;for(let L=0,O=0,$=0,z=0;L<s;L++,O+=3){let j=o[L]*X;h+=j;let V=h;if(l)V%=u,V<0&&(V+=u),$=0;else if(V<0){this.addBeforePosition(V,n,0,a,O);continue}else if(V>u){this.addAfterPosition(V-u,n,c-4,a,O);continue}for(;;$++){let W=m[$];if(!(V>W)){if($==0)V/=W;else{let G=m[$-1];V=(V-G)/(W-G)}break}}if($!=f){f=$;let W=$*6;for(x=n[W],w=n[W+1],p=n[W+2],g=n[W+3],b=n[W+4],y=n[W+5],v=n[W+6],A=n[W+7],S=(x-p*2+b)*.03,I=(w-g*2+y)*.03,T=((p-b)*3-x+v)*.006,M=((g-y)*3-w+A)*.006,Y=S*2+T,F=I*2+M,E=(p-x)*.3+S+T*.16666667,k=(g-w)*.3+I+M*.16666667,N=Math.sqrt(E*E+k*k),B[0]=N,W=1;W<8;W++)E+=Y,k+=F,Y+=T,F+=M,N+=Math.sqrt(E*E+k*k),B[W]=N;E+=Y,k+=F,N+=Math.sqrt(E*E+k*k),B[8]=N,E+=Y+T,k+=F+M,N+=Math.sqrt(E*E+k*k),B[9]=N,z=0}for(V*=N;;z++){let W=B[z];if(!(V>W)){if(z==0)V/=W;else{let G=B[z-1];V=z+(V-G)/(W-G)}break}}this.addCurvePosition(V*.1,x,w,p,g,b,y,v,A,a,O,i||L>0&&j==0)}return a}addBeforePosition(t,s,i,r,h){let o=s[i],a=s[i+1],n=s[i+2]-o,l=s[i+3]-a,c=Math.atan2(l,n);r[h]=o+t*Math.cos(c),r[h+1]=a+t*Math.sin(c),r[h+2]=c}addAfterPosition(t,s,i,r,h){let o=s[i+2],a=s[i+3],n=o-s[i],l=a-s[i+1],c=Math.atan2(l,n);r[h]=o+t*Math.cos(c),r[h+1]=a+t*Math.sin(c),r[h+2]=c}addCurvePosition(t,s,i,r,h,o,a,n,l,c,d,f){if(t==0||isNaN(t)){c[d]=s,c[d+1]=i,c[d+2]=Math.atan2(h-i,r-s);return}let m=t*t,u=m*t,x=1-t,w=x*x,p=w*x,g=x*t,b=g*3,y=x*b,v=b*t,A=s*p+r*y+o*v+n*u,S=i*p+h*y+a*v+l*u;c[d]=A,c[d+1]=S,f&&(t<.001?c[d+2]=Math.atan2(h-i,r-s):c[d+2]=Math.atan2(S-(i*w+h*g*2+a*m),A-(s*w+r*g*2+o*m)))}},Js=class{data;_bone=null;set bone(e){this._bone=e}get bone(){if(this._bone)return this._bone;throw new Error("Bone not set.")}inertia=0;strength=0;damping=0;massInverse=0;wind=0;gravity=0;mix=0;_reset=!0;ux=0;uy=0;cx=0;cy=0;tx=0;ty=0;xOffset=0;xVelocity=0;yOffset=0;yVelocity=0;rotateOffset=0;rotateVelocity=0;scaleOffset=0;scaleVelocity=0;active=!1;skeleton;remaining=0;lastTime=0;constructor(e,t){this.data=e,this.skeleton=t,this.bone=t.bones[e.bone.index],this.inertia=e.inertia,this.strength=e.strength,this.damping=e.damping,this.massInverse=e.massInverse,this.wind=e.wind,this.gravity=e.gravity,this.mix=e.mix}reset(){this.remaining=0,this.lastTime=this.skeleton.time,this._reset=!0,this.xOffset=0,this.xVelocity=0,this.yOffset=0,this.yVelocity=0,this.rotateOffset=0,this.rotateVelocity=0,this.scaleOffset=0,this.scaleVelocity=0}setToSetupPose(){const e=this.data;this.inertia=e.inertia,this.strength=e.strength,this.damping=e.damping,this.massInverse=e.massInverse,this.wind=e.wind,this.gravity=e.gravity,this.mix=e.mix}isActive(){return this.active}update(e){const t=this.mix;if(t==0)return;const s=this.data.x>0,i=this.data.y>0,r=this.data.rotate>0||this.data.shearX>0,h=this.data.scaleX>0,o=this.bone,a=o.data.length;switch(e){case 0:return;case 1:this.reset();case 2:const n=this.skeleton,l=Math.max(this.skeleton.time-this.lastTime,0);this.remaining+=l,this.lastTime=n.time;const c=o.worldX,d=o.worldY;if(this._reset)this._reset=!1,this.ux=c,this.uy=d;else{let f=this.remaining,m=this.inertia,u=this.data.step,x=this.skeleton.data.referenceScale,w=-1,p=this.data.limit*l,g=p*Math.abs(n.scaleY);if(p*=Math.abs(n.scaleX),s||i){if(s){const b=(this.ux-c)*m;this.xOffset+=b>p?p:b<-p?-p:b,this.ux=c}if(i){const b=(this.uy-d)*m;this.yOffset+=b>g?g:b<-g?-g:b,this.uy=d}if(f>=u){w=Math.pow(this.damping,60*u);const b=this.massInverse*u,y=this.strength,v=this.wind*x*n.scaleX,A=this.gravity*x*n.scaleY;do s&&(this.xVelocity+=(v-this.xOffset*y)*b,this.xOffset+=this.xVelocity*u,this.xVelocity*=w),i&&(this.yVelocity-=(A+this.yOffset*y)*b,this.yOffset+=this.yVelocity*u,this.yVelocity*=w),f-=u;while(f>=u)}s&&(o.worldX+=this.xOffset*t*this.data.x),i&&(o.worldY+=this.yOffset*t*this.data.y)}if(r||h){let b=Math.atan2(o.c,o.a),y=0,v=0,A=0,S=this.cx-o.worldX,I=this.cy-o.worldY;if(S>p?S=p:S<-p&&(S=-p),I>g?I=g:I<-g&&(I=-g),r){A=(this.data.rotate+this.data.shearX)*t;let T=Math.atan2(I+this.ty,S+this.tx)-b-this.rotateOffset*A;this.rotateOffset+=(T-Math.ceil(T*R.invPI2-.5)*R.PI2)*m,T=this.rotateOffset*A+b,y=Math.cos(T),v=Math.sin(T),h&&(T=a*o.getWorldScaleX(),T>0&&(this.scaleOffset+=(S*y+I*v)*m/T))}else{y=Math.cos(b),v=Math.sin(b);const T=a*o.getWorldScaleX();T>0&&(this.scaleOffset+=(S*y+I*v)*m/T)}if(f=this.remaining,f>=u){w==-1&&(w=Math.pow(this.damping,60*u));const T=this.massInverse*u,M=this.strength,Y=this.wind,F=Ss.yDown?-this.gravity:this.gravity,E=a/x;for(;;)if(f-=u,h&&(this.scaleVelocity+=(Y*y-F*v-this.scaleOffset*M)*T,this.scaleOffset+=this.scaleVelocity*u,this.scaleVelocity*=w),r){if(this.rotateVelocity-=((Y*v+F*y)*E+this.rotateOffset*M)*T,this.rotateOffset+=this.rotateVelocity*u,this.rotateVelocity*=w,f<u)break;const k=this.rotateOffset*A+b;y=Math.cos(k),v=Math.sin(k)}else if(f<u)break}}this.remaining=f}this.cx=o.worldX,this.cy=o.worldY;break;case 3:s&&(o.worldX+=this.xOffset*t*this.data.x),i&&(o.worldY+=this.yOffset*t*this.data.y)}if(r){let n=this.rotateOffset*t,l=0,c=0,d=0;if(this.data.shearX>0){let f=0;this.data.rotate>0&&(f=n*this.data.rotate,l=Math.sin(f),c=Math.cos(f),d=o.b,o.b=c*d-l*o.d,o.d=l*d+c*o.d),f+=n*this.data.shearX,l=Math.sin(f),c=Math.cos(f),d=o.a,o.a=c*d-l*o.c,o.c=l*d+c*o.c}else n*=this.data.rotate,l=Math.sin(n),c=Math.cos(n),d=o.a,o.a=c*d-l*o.c,o.c=l*d+c*o.c,d=o.b,o.b=c*d-l*o.d,o.d=l*d+c*o.d}if(h){const n=1+this.scaleOffset*t*this.data.scaleX;o.a*=n,o.c*=n}e!=3&&(this.tx=a*o.a,this.ty=a*o.c),o.updateAppliedTransform()}translate(e,t){this.ux-=e,this.uy-=t,this.cx-=e,this.cy-=t}rotate(e,t,s){const i=s*R.degRad,r=Math.cos(i),h=Math.sin(i),o=this.cx-e,a=this.cy-t;this.translate(o*r-a*h-o,o*h+a*r-a)}},vs=class{data;bone;color;darkColor=null;attachment=null;attachmentState=0;sequenceIndex=-1;deform=new Array;constructor(e,t){if(!e)throw new Error("data cannot be null.");if(!t)throw new Error("bone cannot be null.");this.data=e,this.bone=t,this.color=new D,this.darkColor=e.darkColor?new D:null,this.setToSetupPose()}getSkeleton(){return this.bone.skeleton}getAttachment(){return this.attachment}setAttachment(e){this.attachment!=e&&((!(e instanceof oe)||!(this.attachment instanceof oe)||e.timelineAttachment!=this.attachment.timelineAttachment)&&(this.deform.length=0),this.attachment=e,this.sequenceIndex=-1)}setToSetupPose(){this.color.setFromColor(this.data.color),this.darkColor&&this.darkColor.setFromColor(this.data.darkColor),this.data.attachmentName?(this.attachment=null,this.setAttachment(this.bone.skeleton.getAttachment(this.data.index,this.data.attachmentName))):this.attachment=null}},As=class{data;bones;target;mixRotate=0;mixX=0;mixY=0;mixScaleX=0;mixScaleY=0;mixShearY=0;temp=new Xe;active=!1;constructor(e,t){if(!e)throw new Error("data cannot be null.");if(!t)throw new Error("skeleton cannot be null.");this.data=e,this.bones=new Array;for(let i=0;i<e.bones.length;i++){let r=t.findBone(e.bones[i].name);if(!r)throw new Error(`Couldn't find bone ${e.bones[i].name}.`);this.bones.push(r)}let s=t.findBone(e.target.name);if(!s)throw new Error(`Couldn't find target bone ${e.target.name}.`);this.target=s,this.mixRotate=e.mixRotate,this.mixX=e.mixX,this.mixY=e.mixY,this.mixScaleX=e.mixScaleX,this.mixScaleY=e.mixScaleY,this.mixShearY=e.mixShearY}isActive(){return this.active}setToSetupPose(){const e=this.data;this.mixRotate=e.mixRotate,this.mixX=e.mixX,this.mixY=e.mixY,this.mixScaleX=e.mixScaleX,this.mixScaleY=e.mixScaleY,this.mixShearY=e.mixShearY}update(e){this.mixRotate==0&&this.mixX==0&&this.mixY==0&&this.mixScaleX==0&&this.mixScaleY==0&&this.mixShearY==0||(this.data.local?this.data.relative?this.applyRelativeLocal():this.applyAbsoluteLocal():this.data.relative?this.applyRelativeWorld():this.applyAbsoluteWorld())}applyAbsoluteWorld(){let e=this.mixRotate,t=this.mixX,s=this.mixY,i=this.mixScaleX,r=this.mixScaleY,h=this.mixShearY,o=t!=0||s!=0,a=this.target,n=a.a,l=a.b,c=a.c,d=a.d,f=n*d-l*c>0?R.degRad:-R.degRad,m=this.data.offsetRotation*f,u=this.data.offsetShearY*f,x=this.bones;for(let w=0,p=x.length;w<p;w++){let g=x[w];if(e!=0){let b=g.a,y=g.b,v=g.c,A=g.d,S=Math.atan2(c,n)-Math.atan2(v,b)+m;S>R.PI?S-=R.PI2:S<-R.PI&&(S+=R.PI2),S*=e;let I=Math.cos(S),T=Math.sin(S);g.a=I*b-T*v,g.b=I*y-T*A,g.c=T*b+I*v,g.d=T*y+I*A}if(o){let b=this.temp;a.localToWorld(b.set(this.data.offsetX,this.data.offsetY)),g.worldX+=(b.x-g.worldX)*t,g.worldY+=(b.y-g.worldY)*s}if(i!=0){let b=Math.sqrt(g.a*g.a+g.c*g.c);b!=0&&(b=(b+(Math.sqrt(n*n+c*c)-b+this.data.offsetScaleX)*i)/b),g.a*=b,g.c*=b}if(r!=0){let b=Math.sqrt(g.b*g.b+g.d*g.d);b!=0&&(b=(b+(Math.sqrt(l*l+d*d)-b+this.data.offsetScaleY)*r)/b),g.b*=b,g.d*=b}if(h>0){let b=g.b,y=g.d,v=Math.atan2(y,b),A=Math.atan2(d,l)-Math.atan2(c,n)-(v-Math.atan2(g.c,g.a));A>R.PI?A-=R.PI2:A<-R.PI&&(A+=R.PI2),A=v+(A+u)*h;let S=Math.sqrt(b*b+y*y);g.b=Math.cos(A)*S,g.d=Math.sin(A)*S}g.updateAppliedTransform()}}applyRelativeWorld(){let e=this.mixRotate,t=this.mixX,s=this.mixY,i=this.mixScaleX,r=this.mixScaleY,h=this.mixShearY,o=t!=0||s!=0,a=this.target,n=a.a,l=a.b,c=a.c,d=a.d,f=n*d-l*c>0?R.degRad:-R.degRad,m=this.data.offsetRotation*f,u=this.data.offsetShearY*f,x=this.bones;for(let w=0,p=x.length;w<p;w++){let g=x[w];if(e!=0){let b=g.a,y=g.b,v=g.c,A=g.d,S=Math.atan2(c,n)+m;S>R.PI?S-=R.PI2:S<-R.PI&&(S+=R.PI2),S*=e;let I=Math.cos(S),T=Math.sin(S);g.a=I*b-T*v,g.b=I*y-T*A,g.c=T*b+I*v,g.d=T*y+I*A}if(o){let b=this.temp;a.localToWorld(b.set(this.data.offsetX,this.data.offsetY)),g.worldX+=b.x*t,g.worldY+=b.y*s}if(i!=0){let b=(Math.sqrt(n*n+c*c)-1+this.data.offsetScaleX)*i+1;g.a*=b,g.c*=b}if(r!=0){let b=(Math.sqrt(l*l+d*d)-1+this.data.offsetScaleY)*r+1;g.b*=b,g.d*=b}if(h>0){let b=Math.atan2(d,l)-Math.atan2(c,n);b>R.PI?b-=R.PI2:b<-R.PI&&(b+=R.PI2);let y=g.b,v=g.d;b=Math.atan2(v,y)+(b-R.PI/2+u)*h;let A=Math.sqrt(y*y+v*v);g.b=Math.cos(b)*A,g.d=Math.sin(b)*A}g.updateAppliedTransform()}}applyAbsoluteLocal(){let e=this.mixRotate,t=this.mixX,s=this.mixY,i=this.mixScaleX,r=this.mixScaleY,h=this.mixShearY,o=this.target,a=this.bones;for(let n=0,l=a.length;n<l;n++){let c=a[n],d=c.arotation;e!=0&&(d+=(o.arotation-d+this.data.offsetRotation)*e);let f=c.ax,m=c.ay;f+=(o.ax-f+this.data.offsetX)*t,m+=(o.ay-m+this.data.offsetY)*s;let u=c.ascaleX,x=c.ascaleY;i!=0&&u!=0&&(u=(u+(o.ascaleX-u+this.data.offsetScaleX)*i)/u),r!=0&&x!=0&&(x=(x+(o.ascaleY-x+this.data.offsetScaleY)*r)/x);let w=c.ashearY;h!=0&&(w+=(o.ashearY-w+this.data.offsetShearY)*h),c.updateWorldTransformWith(f,m,d,u,x,c.ashearX,w)}}applyRelativeLocal(){let e=this.mixRotate,t=this.mixX,s=this.mixY,i=this.mixScaleX,r=this.mixScaleY,h=this.mixShearY,o=this.target,a=this.bones;for(let n=0,l=a.length;n<l;n++){let c=a[n],d=c.arotation+(o.arotation+this.data.offsetRotation)*e,f=c.ax+(o.ax+this.data.offsetX)*t,m=c.ay+(o.ay+this.data.offsetY)*s,u=c.ascaleX*((o.ascaleX-1+this.data.offsetScaleX)*i+1),x=c.ascaleY*((o.ascaleY-1+this.data.offsetScaleY)*r+1),w=c.ashearY+(o.ashearY+this.data.offsetShearY)*h;c.updateWorldTransformWith(f,m,d,u,x,c.ashearX,w)}}},Ss=class Jt{static quadTriangles=[0,1,2,2,3,0];static yDown=!1;data;bones;slots;drawOrder;ikConstraints;transformConstraints;pathConstraints;physicsConstraints;_updateCache=new Array;skin=null;color;scaleX=1;_scaleY=1;get scaleY(){return Jt.yDown?-this._scaleY:this._scaleY}set scaleY(t){this._scaleY=t}x=0;y=0;time=0;constructor(t){if(!t)throw new Error("data cannot be null.");this.data=t,this.bones=new Array;for(let s=0;s<t.bones.length;s++){let i=t.bones[s],r;if(!i.parent)r=new Et(i,this,null);else{let h=this.bones[i.parent.index];r=new Et(i,this,h),h.children.push(r)}this.bones.push(r)}this.slots=new Array,this.drawOrder=new Array;for(let s=0;s<t.slots.length;s++){let i=t.slots[s],r=this.bones[i.boneData.index],h=new vs(i,r);this.slots.push(h),this.drawOrder.push(h)}this.ikConstraints=new Array;for(let s=0;s<t.ikConstraints.length;s++){let i=t.ikConstraints[s];this.ikConstraints.push(new ps(i,this))}this.transformConstraints=new Array;for(let s=0;s<t.transformConstraints.length;s++){let i=t.transformConstraints[s];this.transformConstraints.push(new As(i,this))}this.pathConstraints=new Array;for(let s=0;s<t.pathConstraints.length;s++){let i=t.pathConstraints[s];this.pathConstraints.push(new ys(i,this))}this.physicsConstraints=new Array;for(let s=0;s<t.physicsConstraints.length;s++){let i=t.physicsConstraints[s];this.physicsConstraints.push(new Js(i,this))}this.color=new D(1,1,1,1),this.updateCache()}updateCache(){let t=this._updateCache;t.length=0;let s=this.bones;for(let f=0,m=s.length;f<m;f++){let u=s[f];u.sorted=u.data.skinRequired,u.active=!u.sorted}if(this.skin){let f=this.skin.bones;for(let m=0,u=this.skin.bones.length;m<u;m++){let x=this.bones[f[m].index];do x.sorted=!1,x.active=!0,x=x.parent;while(x)}}let i=this.ikConstraints,r=this.transformConstraints,h=this.pathConstraints,o=this.physicsConstraints,a=i.length,n=r.length,l=h.length,c=this.physicsConstraints.length,d=a+n+l+c;e:for(let f=0;f<d;f++){for(let m=0;m<a;m++){let u=i[m];if(u.data.order==f){this.sortIkConstraint(u);continue e}}for(let m=0;m<n;m++){let u=r[m];if(u.data.order==f){this.sortTransformConstraint(u);continue e}}for(let m=0;m<l;m++){let u=h[m];if(u.data.order==f){this.sortPathConstraint(u);continue e}}for(let m=0;m<c;m++){const u=o[m];if(u.data.order==f){this.sortPhysicsConstraint(u);continue e}}}for(let f=0,m=s.length;f<m;f++)this.sortBone(s[f])}sortIkConstraint(t){if(t.active=t.target.isActive()&&(!t.data.skinRequired||this.skin&&P.contains(this.skin.constraints,t.data,!0)),!t.active)return;let s=t.target;this.sortBone(s);let i=t.bones,r=i[0];if(this.sortBone(r),i.length==1)this._updateCache.push(t),this.sortReset(r.children);else{let h=i[i.length-1];this.sortBone(h),this._updateCache.push(t),this.sortReset(r.children),h.sorted=!0}}sortPathConstraint(t){if(t.active=t.target.bone.isActive()&&(!t.data.skinRequired||this.skin&&P.contains(this.skin.constraints,t.data,!0)),!t.active)return;let s=t.target,i=s.data.index,r=s.bone;this.skin&&this.sortPathConstraintAttachment(this.skin,i,r),this.data.defaultSkin&&this.data.defaultSkin!=this.skin&&this.sortPathConstraintAttachment(this.data.defaultSkin,i,r);for(let n=0,l=this.data.skins.length;n<l;n++)this.sortPathConstraintAttachment(this.data.skins[n],i,r);let h=s.getAttachment();h instanceof Ie&&this.sortPathConstraintAttachmentWith(h,r);let o=t.bones,a=o.length;for(let n=0;n<a;n++)this.sortBone(o[n]);this._updateCache.push(t);for(let n=0;n<a;n++)this.sortReset(o[n].children);for(let n=0;n<a;n++)o[n].sorted=!0}sortTransformConstraint(t){if(t.active=t.target.isActive()&&(!t.data.skinRequired||this.skin&&P.contains(this.skin.constraints,t.data,!0)),!t.active)return;this.sortBone(t.target);let s=t.bones,i=s.length;if(t.data.local)for(let r=0;r<i;r++){let h=s[r];this.sortBone(h.parent),this.sortBone(h)}else for(let r=0;r<i;r++)this.sortBone(s[r]);this._updateCache.push(t);for(let r=0;r<i;r++)this.sortReset(s[r].children);for(let r=0;r<i;r++)s[r].sorted=!0}sortPathConstraintAttachment(t,s,i){let r=t.attachments[s];if(r)for(let h in r)this.sortPathConstraintAttachmentWith(r[h],i)}sortPathConstraintAttachmentWith(t,s){if(!(t instanceof Ie))return;let i=t.bones;if(!i)this.sortBone(s);else{let r=this.bones;for(let h=0,o=i.length;h<o;){let a=i[h++];for(a+=h;h<a;)this.sortBone(r[i[h++]])}}}sortPhysicsConstraint(t){const s=t.bone;t.active=s.active&&(!t.data.skinRequired||this.skin!=null&&P.contains(this.skin.constraints,t.data,!0)),t.active&&(this.sortBone(s),this._updateCache.push(t),this.sortReset(s.children),s.sorted=!0)}sortBone(t){if(!t||t.sorted)return;let s=t.parent;s&&this.sortBone(s),t.sorted=!0,this._updateCache.push(t)}sortReset(t){for(let s=0,i=t.length;s<i;s++){let r=t[s];r.active&&(r.sorted&&this.sortReset(r.children),r.sorted=!1)}}updateWorldTransform(t){if(t==null)throw new Error("physics is undefined");let s=this.bones;for(let r=0,h=s.length;r<h;r++){let o=s[r];o.ax=o.x,o.ay=o.y,o.arotation=o.rotation,o.ascaleX=o.scaleX,o.ascaleY=o.scaleY,o.ashearX=o.shearX,o.ashearY=o.shearY}let i=this._updateCache;for(let r=0,h=i.length;r<h;r++)i[r].update(t)}updateWorldTransformWith(t,s){if(!s)throw new Error("parent cannot be null.");let i=this.bones;for(let w=1,p=i.length;w<p;w++){let g=i[w];g.ax=g.x,g.ay=g.y,g.arotation=g.rotation,g.ascaleX=g.scaleX,g.ascaleY=g.scaleY,g.ashearX=g.shearX,g.ashearY=g.shearY}let r=this.getRootBone();if(!r)throw new Error("Root bone must not be null.");let h=s.a,o=s.b,a=s.c,n=s.d;r.worldX=h*this.x+o*this.y+s.worldX,r.worldY=a*this.x+n*this.y+s.worldY;const l=(r.rotation+r.shearX)*R.degRad,c=(r.rotation+90+r.shearY)*R.degRad,d=Math.cos(l)*r.scaleX,f=Math.cos(c)*r.scaleY,m=Math.sin(l)*r.scaleX,u=Math.sin(c)*r.scaleY;r.a=(h*d+o*m)*this.scaleX,r.b=(h*f+o*u)*this.scaleX,r.c=(a*d+n*m)*this.scaleY,r.d=(a*f+n*u)*this.scaleY;let x=this._updateCache;for(let w=0,p=x.length;w<p;w++){let g=x[w];g!=r&&g.update(t)}}setToSetupPose(){this.setBonesToSetupPose(),this.setSlotsToSetupPose()}setBonesToSetupPose(){for(const t of this.bones)t.setToSetupPose();for(const t of this.ikConstraints)t.setToSetupPose();for(const t of this.transformConstraints)t.setToSetupPose();for(const t of this.pathConstraints)t.setToSetupPose();for(const t of this.physicsConstraints)t.setToSetupPose()}setSlotsToSetupPose(){let t=this.slots;P.arrayCopy(t,0,this.drawOrder,0,t.length);for(let s=0,i=t.length;s<i;s++)t[s].setToSetupPose()}getRootBone(){return this.bones.length==0?null:this.bones[0]}findBone(t){if(!t)throw new Error("boneName cannot be null.");let s=this.bones;for(let i=0,r=s.length;i<r;i++){let h=s[i];if(h.data.name==t)return h}return null}findSlot(t){if(!t)throw new Error("slotName cannot be null.");let s=this.slots;for(let i=0,r=s.length;i<r;i++){let h=s[i];if(h.data.name==t)return h}return null}setSkinByName(t){let s=this.data.findSkin(t);if(!s)throw new Error("Skin not found: "+t);this.setSkin(s)}setSkin(t){if(t!=this.skin){if(t)if(this.skin)t.attachAll(this,this.skin);else{let s=this.slots;for(let i=0,r=s.length;i<r;i++){let h=s[i],o=h.data.attachmentName;if(o){let a=t.getAttachment(i,o);a&&h.setAttachment(a)}}}this.skin=t,this.updateCache()}}getAttachmentByName(t,s){let i=this.data.findSlot(t);if(!i)throw new Error(`Can't find slot with name ${t}`);return this.getAttachment(i.index,s)}getAttachment(t,s){if(!s)throw new Error("attachmentName cannot be null.");if(this.skin){let i=this.skin.getAttachment(t,s);if(i)return i}return this.data.defaultSkin?this.data.defaultSkin.getAttachment(t,s):null}setAttachment(t,s){if(!t)throw new Error("slotName cannot be null.");let i=this.slots;for(let r=0,h=i.length;r<h;r++){let o=i[r];if(o.data.name==t){let a=null;if(s&&(a=this.getAttachment(r,s),!a))throw new Error("Attachment not found: "+s+", for slot: "+t);o.setAttachment(a);return}}throw new Error("Slot not found: "+t)}findIkConstraint(t){if(!t)throw new Error("constraintName cannot be null.");return this.ikConstraints.find(s=>s.data.name==t)??null}findTransformConstraint(t){if(!t)throw new Error("constraintName cannot be null.");return this.transformConstraints.find(s=>s.data.name==t)??null}findPathConstraint(t){if(!t)throw new Error("constraintName cannot be null.");return this.pathConstraints.find(s=>s.data.name==t)??null}findPhysicsConstraint(t){if(t==null)throw new Error("constraintName cannot be null.");return this.physicsConstraints.find(s=>s.data.name==t)??null}getBoundsRect(t){let s=new Xe,i=new Xe;return this.getBounds(s,i,void 0,t),{x:s.x,y:s.y,width:i.x,height:i.y}}getBounds(t,s,i=new Array(2),r=null){if(!t)throw new Error("offset cannot be null.");if(!s)throw new Error("size cannot be null.");let h=this.drawOrder,o=Number.POSITIVE_INFINITY,a=Number.POSITIVE_INFINITY,n=Number.NEGATIVE_INFINITY,l=Number.NEGATIVE_INFINITY;for(let c=0,d=h.length;c<d;c++){let f=h[c];if(!f.bone.active)continue;let m=0,u=null,x=null,w=f.getAttachment();if(w instanceof H)m=8,u=P.setArraySize(i,m,0),w.computeWorldVertices(f,u,0,2),x=Jt.quadTriangles;else if(w instanceof Ce){let p=w;m=p.worldVerticesLength,u=P.setArraySize(i,m,0),p.computeWorldVertices(f,0,m,u,0,2),x=p.triangles}else if(w instanceof Tt&&r!=null){r.clipStart(f,w);continue}if(u&&x){r!=null&&r.isClipping()&&(r.clipTriangles(u,x,x.length),u=r.clippedVertices,m=r.clippedVertices.length);for(let p=0,g=u.length;p<g;p+=2){let b=u[p],y=u[p+1];o=Math.min(o,b),a=Math.min(a,y),n=Math.max(n,b),l=Math.max(l,y)}}r?.clipEndWithSlot(f)}r?.clipEnd(),t.set(o,a),s.set(n-o,l-a)}update(t){this.time+=t}physicsTranslate(t,s){const i=this.physicsConstraints;for(let r=0,h=i.length;r<h;r++)i[r].translate(t,s)}physicsRotate(t,s,i){const r=this.physicsConstraints;for(let h=0,o=r.length;h<o;h++)r[h].rotate(t,s,i)}},Cs=(e=>(e[e.none=0]="none",e[e.reset=1]="reset",e[e.update=2]="update",e[e.pose=3]="pose",e))(Cs||{}),Is=class extends ke{_bone=null;set bone(e){this._bone=e}get bone(){if(this._bone)return this._bone;throw new Error("BoneData not set.")}x=0;y=0;rotate=0;scaleX=0;shearX=0;limit=0;step=0;inertia=0;strength=0;damping=0;massInverse=0;wind=0;gravity=0;mix=0;inertiaGlobal=!1;strengthGlobal=!1;dampingGlobal=!1;massGlobal=!1;windGlobal=!1;gravityGlobal=!1;mixGlobal=!1;constructor(e){super(e,0,!1)}},qt=class{name=null;bones=new Array;slots=new Array;skins=new Array;defaultSkin=null;events=new Array;animations=new Array;ikConstraints=new Array;transformConstraints=new Array;pathConstraints=new Array;physicsConstraints=new Array;x=0;y=0;width=0;height=0;referenceScale=100;version=null;hash=null;fps=0;imagesPath=null;audioPath=null;findBone(e){if(!e)throw new Error("boneName cannot be null.");let t=this.bones;for(let s=0,i=t.length;s<i;s++){let r=t[s];if(r.name==e)return r}return null}findSlot(e){if(!e)throw new Error("slotName cannot be null.");let t=this.slots;for(let s=0,i=t.length;s<i;s++){let r=t[s];if(r.name==e)return r}return null}findSkin(e){if(!e)throw new Error("skinName cannot be null.");let t=this.skins;for(let s=0,i=t.length;s<i;s++){let r=t[s];if(r.name==e)return r}return null}findEvent(e){if(!e)throw new Error("eventDataName cannot be null.");let t=this.events;for(let s=0,i=t.length;s<i;s++){let r=t[s];if(r.name==e)return r}return null}findAnimation(e){if(!e)throw new Error("animationName cannot be null.");let t=this.animations;for(let s=0,i=t.length;s<i;s++){let r=t[s];if(r.name==e)return r}return null}findIkConstraint(e){if(!e)throw new Error("constraintName cannot be null.");const t=this.ikConstraints;for(let s=0,i=t.length;s<i;s++){const r=t[s];if(r.name==e)return r}return null}findTransformConstraint(e){if(!e)throw new Error("constraintName cannot be null.");const t=this.transformConstraints;for(let s=0,i=t.length;s<i;s++){const r=t[s];if(r.name==e)return r}return null}findPathConstraint(e){if(!e)throw new Error("constraintName cannot be null.");const t=this.pathConstraints;for(let s=0,i=t.length;s<i;s++){const r=t[s];if(r.name==e)return r}return null}findPhysicsConstraint(e){if(!e)throw new Error("constraintName cannot be null.");const t=this.physicsConstraints;for(let s=0,i=t.length;s<i;s++){const r=t[s];if(r.name==e)return r}return null}},Wt=class{constructor(e=0,t,s){this.slotIndex=e,this.name=t,this.attachment=s}},Ne=class{name;attachments=new Array;bones=Array();constraints=new Array;color=new D(.99607843,.61960787,.30980393,1);constructor(e){if(!e)throw new Error("name cannot be null.");this.name=e}setAttachment(e,t,s){if(!s)throw new Error("attachment cannot be null.");let i=this.attachments;e>=i.length&&(i.length=e+1),i[e]||(i[e]={}),i[e][t]=s}addSkin(e){for(let i=0;i<e.bones.length;i++){let r=e.bones[i],h=!1;for(let o=0;o<this.bones.length;o++)if(this.bones[o]==r){h=!0;break}h||this.bones.push(r)}for(let i=0;i<e.constraints.length;i++){let r=e.constraints[i],h=!1;for(let o=0;o<this.constraints.length;o++)if(this.constraints[o]==r){h=!0;break}h||this.constraints.push(r)}let t=e.getAttachments();for(let i=0;i<t.length;i++){var s=t[i];this.setAttachment(s.slotIndex,s.name,s.attachment)}}copySkin(e){for(let i=0;i<e.bones.length;i++){let r=e.bones[i],h=!1;for(let o=0;o<this.bones.length;o++)if(this.bones[o]==r){h=!0;break}h||this.bones.push(r)}for(let i=0;i<e.constraints.length;i++){let r=e.constraints[i],h=!1;for(let o=0;o<this.constraints.length;o++)if(this.constraints[o]==r){h=!0;break}h||this.constraints.push(r)}let t=e.getAttachments();for(let i=0;i<t.length;i++){var s=t[i];s.attachment&&(s.attachment instanceof Ce?(s.attachment=s.attachment.newLinkedMesh(),this.setAttachment(s.slotIndex,s.name,s.attachment)):(s.attachment=s.attachment.copy(),this.setAttachment(s.slotIndex,s.name,s.attachment)))}}getAttachment(e,t){let s=this.attachments[e];return s?s[t]:null}removeAttachment(e,t){let s=this.attachments[e];s&&delete s[t]}getAttachments(){let e=new Array;for(var t=0;t<this.attachments.length;t++){let s=this.attachments[t];if(s)for(let i in s){let r=s[i];r&&e.push(new Wt(t,i,r))}}return e}getAttachmentsForSlot(e,t){let s=this.attachments[e];if(s)for(let i in s){let r=s[i];r&&t.push(new Wt(e,i,r))}}clear(){this.attachments.length=0,this.bones.length=0,this.constraints.length=0}attachAll(e,t){let s=0;for(let i=0;i<e.slots.length;i++){let r=e.slots[i],h=r.getAttachment();if(h&&s<t.attachments.length){let o=t.attachments[s];for(let a in o){let n=o[a];if(h==n){let l=this.getAttachment(s,a);l&&r.setAttachment(l);break}}}s++}}},Ut=class{index=0;name;boneData;color=new D(1,1,1,1);darkColor=null;attachmentName=null;blendMode=0;visible=!0;constructor(e,t,s){if(e<0)throw new Error("index must be >= 0.");if(!t)throw new Error("name cannot be null.");if(!s)throw new Error("boneData cannot be null.");this.index=e,this.name=t,this.boneData=s}},zt=(e=>(e[e.Normal=0]="Normal",e[e.Additive=1]="Additive",e[e.Multiply=2]="Multiply",e[e.Screen=3]="Screen",e))(zt||{}),_t=class extends ke{bones=new Array;_target=null;set target(e){this._target=e}get target(){if(this._target)return this._target;throw new Error("BoneData not set.")}mixRotate=0;mixX=0;mixY=0;mixScaleX=0;mixScaleY=0;mixShearY=0;offsetRotation=0;offsetX=0;offsetY=0;offsetScaleX=0;offsetScaleY=0;offsetShearY=0;relative=!1;local=!1;constructor(e){super(e,0,!1)}},js=class{scale=1;attachmentLoader;linkedMeshes=new Array;constructor(e){this.attachmentLoader=e}readSkeletonData(e){let t=this.scale,s=new qt;s.name="";let i=new ks(e),r=i.readInt32(),h=i.readInt32();s.hash=h==0&&r==0?null:h.toString(16)+r.toString(16),s.version=i.readString(),s.x=i.readFloat(),s.y=i.readFloat(),s.width=i.readFloat(),s.height=i.readFloat(),s.referenceScale=i.readFloat()*t;let o=i.readBoolean();o&&(s.fps=i.readFloat(),s.imagesPath=i.readString(),s.audioPath=i.readString());let a=0;a=i.readInt(!0);for(let l=0;l<a;l++){let c=i.readString();if(!c)throw new Error("String in string table must not be null.");i.strings.push(c)}a=i.readInt(!0);for(let l=0;l<a;l++){let c=i.readString();if(!c)throw new Error("Bone name must not be null.");let d=l==0?null:s.bones[i.readInt(!0)],f=new Ft(l,c,d);f.rotation=i.readFloat(),f.x=i.readFloat()*t,f.y=i.readFloat()*t,f.scaleX=i.readFloat(),f.scaleY=i.readFloat(),f.shearX=i.readFloat(),f.shearY=i.readFloat(),f.length=i.readFloat()*t,f.inherit=i.readByte(),f.skinRequired=i.readBoolean(),o&&(D.rgba8888ToColor(f.color,i.readInt32()),f.icon=i.readString()??void 0,f.visible=i.readBoolean()),s.bones.push(f)}a=i.readInt(!0);for(let l=0;l<a;l++){let c=i.readString();if(!c)throw new Error("Slot name must not be null.");let d=s.bones[i.readInt(!0)],f=new Ut(l,c,d);D.rgba8888ToColor(f.color,i.readInt32());let m=i.readInt32();m!=-1&&D.rgb888ToColor(f.darkColor=new D,m),f.attachmentName=i.readStringRef(),f.blendMode=i.readInt(!0),o&&(f.visible=i.readBoolean()),s.slots.push(f)}a=i.readInt(!0);for(let l=0,c;l<a;l++){let d=i.readString();if(!d)throw new Error("IK constraint data name must not be null.");let f=new Vt(d);f.order=i.readInt(!0),c=i.readInt(!0);for(let u=0;u<c;u++)f.bones.push(s.bones[i.readInt(!0)]);f.target=s.bones[i.readInt(!0)];let m=i.readByte();f.skinRequired=(m&1)!=0,f.bendDirection=(m&2)!=0?1:-1,f.compress=(m&4)!=0,f.stretch=(m&8)!=0,f.uniform=(m&16)!=0,(m&32)!=0&&(f.mix=(m&64)!=0?i.readFloat():1),(m&128)!=0&&(f.softness=i.readFloat()*t),s.ikConstraints.push(f)}a=i.readInt(!0);for(let l=0,c;l<a;l++){let d=i.readString();if(!d)throw new Error("Transform constraint data name must not be null.");let f=new _t(d);f.order=i.readInt(!0),c=i.readInt(!0);for(let u=0;u<c;u++)f.bones.push(s.bones[i.readInt(!0)]);f.target=s.bones[i.readInt(!0)];let m=i.readByte();f.skinRequired=(m&1)!=0,f.local=(m&2)!=0,f.relative=(m&4)!=0,(m&8)!=0&&(f.offsetRotation=i.readFloat()),(m&16)!=0&&(f.offsetX=i.readFloat()*t),(m&32)!=0&&(f.offsetY=i.readFloat()*t),(m&64)!=0&&(f.offsetScaleX=i.readFloat()),(m&128)!=0&&(f.offsetScaleY=i.readFloat()),m=i.readByte(),(m&1)!=0&&(f.offsetShearY=i.readFloat()),(m&2)!=0&&(f.mixRotate=i.readFloat()),(m&4)!=0&&(f.mixX=i.readFloat()),(m&8)!=0&&(f.mixY=i.readFloat()),(m&16)!=0&&(f.mixScaleX=i.readFloat()),(m&32)!=0&&(f.mixScaleY=i.readFloat()),(m&64)!=0&&(f.mixShearY=i.readFloat()),s.transformConstraints.push(f)}a=i.readInt(!0);for(let l=0,c;l<a;l++){let d=i.readString();if(!d)throw new Error("Path constraint data name must not be null.");let f=new Lt(d);f.order=i.readInt(!0),f.skinRequired=i.readBoolean(),c=i.readInt(!0);for(let u=0;u<c;u++)f.bones.push(s.bones[i.readInt(!0)]);f.target=s.slots[i.readInt(!0)];const m=i.readByte();f.positionMode=m&1,f.spacingMode=m>>1&3,f.rotateMode=m>>3&3,(m&128)!=0&&(f.offsetRotation=i.readFloat()),f.position=i.readFloat(),f.positionMode==0&&(f.position*=t),f.spacing=i.readFloat(),(f.spacingMode==0||f.spacingMode==1)&&(f.spacing*=t),f.mixRotate=i.readFloat(),f.mixX=i.readFloat(),f.mixY=i.readFloat(),s.pathConstraints.push(f)}a=i.readInt(!0);for(let l=0,c;l<a;l++){const d=i.readString();if(!d)throw new Error("Physics constraint data name must not be null.");const f=new Is(d);f.order=i.readInt(!0),f.bone=s.bones[i.readInt(!0)];let m=i.readByte();f.skinRequired=(m&1)!=0,(m&2)!=0&&(f.x=i.readFloat()),(m&4)!=0&&(f.y=i.readFloat()),(m&8)!=0&&(f.rotate=i.readFloat()),(m&16)!=0&&(f.scaleX=i.readFloat()),(m&32)!=0&&(f.shearX=i.readFloat()),f.limit=((m&64)!=0?i.readFloat():5e3)*t,f.step=1/i.readUnsignedByte(),f.inertia=i.readFloat(),f.strength=i.readFloat(),f.damping=i.readFloat(),f.massInverse=(m&128)!=0?i.readFloat():1,f.wind=i.readFloat(),f.gravity=i.readFloat(),m=i.readByte(),(m&1)!=0&&(f.inertiaGlobal=!0),(m&2)!=0&&(f.strengthGlobal=!0),(m&4)!=0&&(f.dampingGlobal=!0),(m&8)!=0&&(f.massGlobal=!0),(m&16)!=0&&(f.windGlobal=!0),(m&32)!=0&&(f.gravityGlobal=!0),(m&64)!=0&&(f.mixGlobal=!0),f.mix=(m&128)!=0?i.readFloat():1,s.physicsConstraints.push(f)}let n=this.readSkin(i,s,!0,o);n&&(s.defaultSkin=n,s.skins.push(n));{let l=s.skins.length;for(P.setArraySize(s.skins,a=l+i.readInt(!0));l<a;l++){let c=this.readSkin(i,s,!1,o);if(!c)throw new Error("readSkin() should not have returned null.");s.skins[l]=c}}a=this.linkedMeshes.length;for(let l=0;l<a;l++){let c=this.linkedMeshes[l];const d=s.skins[c.skinIndex];if(!c.parent)throw new Error("Linked mesh parent must not be null");let f=d.getAttachment(c.slotIndex,c.parent);if(!f)throw new Error(`Parent mesh not found: ${c.parent}`);c.mesh.timelineAttachment=c.inheritTimeline?f:c.mesh,c.mesh.setParentMesh(f),c.mesh.region!=null&&c.mesh.updateRegion()}this.linkedMeshes.length=0,a=i.readInt(!0);for(let l=0;l<a;l++){let c=i.readString();if(!c)throw new Error("Event data name must not be null");let d=new Bt(c);d.intValue=i.readInt(!1),d.floatValue=i.readFloat(),d.stringValue=i.readString(),d.audioPath=i.readString(),d.audioPath&&(d.volume=i.readFloat(),d.balance=i.readFloat()),s.events.push(d)}a=i.readInt(!0);for(let l=0;l<a;l++){let c=i.readString();if(!c)throw new Error("Animatio name must not be null.");s.animations.push(this.readAnimation(i,c,s))}return s}readSkin(e,t,s,i){let r=null,h=0;if(s){if(h=e.readInt(!0),h==0)return null;r=new Ne("default")}else{let o=e.readString();if(!o)throw new Error("Skin name must not be null.");r=new Ne(o),i&&D.rgba8888ToColor(r.color,e.readInt32()),r.bones.length=e.readInt(!0);for(let a=0,n=r.bones.length;a<n;a++)r.bones[a]=t.bones[e.readInt(!0)];for(let a=0,n=e.readInt(!0);a<n;a++)r.constraints.push(t.ikConstraints[e.readInt(!0)]);for(let a=0,n=e.readInt(!0);a<n;a++)r.constraints.push(t.transformConstraints[e.readInt(!0)]);for(let a=0,n=e.readInt(!0);a<n;a++)r.constraints.push(t.pathConstraints[e.readInt(!0)]);for(let a=0,n=e.readInt(!0);a<n;a++)r.constraints.push(t.physicsConstraints[e.readInt(!0)]);h=e.readInt(!0)}for(let o=0;o<h;o++){let a=e.readInt(!0);for(let n=0,l=e.readInt(!0);n<l;n++){let c=e.readStringRef();if(!c)throw new Error("Attachment name must not be null");let d=this.readAttachment(e,t,r,a,c,i);d&&r.setAttachment(a,c,d)}}return r}readAttachment(e,t,s,i,r,h){let o=this.scale,a=e.readByte();const n=(a&8)!=0?e.readStringRef():r;if(!n)throw new Error("Attachment name must not be null");switch(a&7){case 0:{let l=(a&16)!=0?e.readStringRef():null;const c=(a&32)!=0?e.readInt32():4294967295,d=(a&64)!=0?this.readSequence(e):null;let f=(a&128)!=0?e.readFloat():0,m=e.readFloat(),u=e.readFloat(),x=e.readFloat(),w=e.readFloat(),p=e.readFloat(),g=e.readFloat();l||(l=n);let b=this.attachmentLoader.newRegionAttachment(s,n,l,d);return b?(b.path=l,b.x=m*o,b.y=u*o,b.scaleX=x,b.scaleY=w,b.rotation=f,b.width=p*o,b.height=g*o,D.rgba8888ToColor(b.color,c),b.sequence=d,d==null&&b.updateRegion(),b):null}case 1:{let l=this.readVertices(e,(a&16)!=0),c=h?e.readInt32():0,d=this.attachmentLoader.newBoundingBoxAttachment(s,n);return d?(d.worldVerticesLength=l.length,d.vertices=l.vertices,d.bones=l.bones,h&&D.rgba8888ToColor(d.color,c),d):null}case 2:{let l=(a&16)!=0?e.readStringRef():n;const c=(a&32)!=0?e.readInt32():4294967295,d=(a&64)!=0?this.readSequence(e):null,f=e.readInt(!0),m=this.readVertices(e,(a&128)!=0),u=this.readFloatArray(e,m.length,1),x=this.readShortArray(e,(m.length-f-2)*3);let w=[],p=0,g=0;h&&(w=this.readShortArray(e,e.readInt(!0)),p=e.readFloat(),g=e.readFloat()),l||(l=n);let b=this.attachmentLoader.newMeshAttachment(s,n,l,d);return b?(b.path=l,D.rgba8888ToColor(b.color,c),b.bones=m.bones,b.vertices=m.vertices,b.worldVerticesLength=m.length,b.triangles=x,b.regionUVs=u,d==null&&b.updateRegion(),b.hullLength=f<<1,b.sequence=d,h&&(b.edges=w,b.width=p*o,b.height=g*o),b):null}case 3:{const l=(a&16)!=0?e.readStringRef():n;if(l==null)throw new Error("Path of linked mesh must not be null");const c=(a&32)!=0?e.readInt32():4294967295,d=(a&64)!=0?this.readSequence(e):null,f=(a&128)!=0,m=e.readInt(!0),u=e.readStringRef();let x=0,w=0;h&&(x=e.readFloat(),w=e.readFloat());let p=this.attachmentLoader.newMeshAttachment(s,n,l,d);return p?(p.path=l,D.rgba8888ToColor(p.color,c),p.sequence=d,h&&(p.width=x*o,p.height=w*o),this.linkedMeshes.push(new Ks(p,m,i,u,f)),p):null}case 4:{const l=(a&16)!=0,c=(a&32)!=0,d=this.readVertices(e,(a&64)!=0),f=P.newArray(d.length/6,0);for(let x=0,w=f.length;x<w;x++)f[x]=e.readFloat()*o;const m=h?e.readInt32():0,u=this.attachmentLoader.newPathAttachment(s,n);return u?(u.closed=l,u.constantSpeed=c,u.worldVerticesLength=d.length,u.vertices=d.vertices,u.bones=d.bones,u.lengths=f,h&&D.rgba8888ToColor(u.color,m),u):null}case 5:{const l=e.readFloat(),c=e.readFloat(),d=e.readFloat(),f=h?e.readInt32():0,m=this.attachmentLoader.newPointAttachment(s,n);return m?(m.x=c*o,m.y=d*o,m.rotation=l,h&&D.rgba8888ToColor(m.color,f),m):null}case 6:{const l=e.readInt(!0),c=this.readVertices(e,(a&16)!=0);let d=h?e.readInt32():0,f=this.attachmentLoader.newClippingAttachment(s,n);return f?(f.endSlot=t.slots[l],f.worldVerticesLength=c.length,f.vertices=c.vertices,f.bones=c.bones,h&&D.rgba8888ToColor(f.color,d),f):null}}return null}readSequence(e){let t=new is(e.readInt(!0));return t.start=e.readInt(!0),t.digits=e.readInt(!0),t.setupIndex=e.readInt(!0),t}readVertices(e,t){const s=this.scale,i=e.readInt(!0),r=new Qs;if(r.length=i<<1,!t)return r.vertices=this.readFloatArray(e,r.length,s),r;let h=new Array,o=new Array;for(let a=0;a<i;a++){let n=e.readInt(!0);o.push(n);for(let l=0;l<n;l++)o.push(e.readInt(!0)),h.push(e.readFloat()*s),h.push(e.readFloat()*s),h.push(e.readFloat())}return r.vertices=P.toFloatArray(h),r.bones=o,r}readFloatArray(e,t,s){let i=new Array(t);if(s==1)for(let r=0;r<t;r++)i[r]=e.readFloat();else for(let r=0;r<t;r++)i[r]=e.readFloat()*s;return i}readShortArray(e,t){let s=new Array(t);for(let i=0;i<t;i++)s[i]=e.readInt(!0);return s}readAnimation(e,t,s){e.readInt(!0);let i=new Array,r=this.scale;for(let n=0,l=e.readInt(!0);n<l;n++){let c=e.readInt(!0);for(let d=0,f=e.readInt(!0);d<f;d++){let m=e.readByte(),u=e.readInt(!0),x=u-1;switch(m){case ci:{let w=new me(u,c);for(let p=0;p<u;p++)w.setFrame(p,e.readFloat(),e.readStringRef());i.push(w);break}case di:{let w=e.readInt(!0),p=new it(u,w,c),g=e.readFloat(),b=e.readUnsignedByte()/255,y=e.readUnsignedByte()/255,v=e.readUnsignedByte()/255,A=e.readUnsignedByte()/255;for(let S=0,I=0;p.setFrame(S,g,b,y,v,A),S!=x;S++){let T=e.readFloat(),M=e.readUnsignedByte()/255,Y=e.readUnsignedByte()/255,F=e.readUnsignedByte()/255,E=e.readUnsignedByte()/255;switch(e.readByte()){case he:p.setStepped(S);break;case ce:U(e,p,I++,S,0,g,T,b,M,1),U(e,p,I++,S,1,g,T,y,Y,1),U(e,p,I++,S,2,g,T,v,F,1),U(e,p,I++,S,3,g,T,A,E,1)}g=T,b=M,y=Y,v=F,A=E}i.push(p);break}case fi:{let w=e.readInt(!0),p=new rt(u,w,c),g=e.readFloat(),b=e.readUnsignedByte()/255,y=e.readUnsignedByte()/255,v=e.readUnsignedByte()/255;for(let A=0,S=0;p.setFrame(A,g,b,y,v),A!=x;A++){let I=e.readFloat(),T=e.readUnsignedByte()/255,M=e.readUnsignedByte()/255,Y=e.readUnsignedByte()/255;switch(e.readByte()){case he:p.setStepped(A);break;case ce:U(e,p,S++,A,0,g,I,b,T,1),U(e,p,S++,A,1,g,I,y,M,1),U(e,p,S++,A,2,g,I,v,Y,1)}g=I,b=T,y=M,v=Y}i.push(p);break}case ui:{let w=e.readInt(!0),p=new nt(u,w,c),g=e.readFloat(),b=e.readUnsignedByte()/255,y=e.readUnsignedByte()/255,v=e.readUnsignedByte()/255,A=e.readUnsignedByte()/255,S=e.readUnsignedByte()/255,I=e.readUnsignedByte()/255,T=e.readUnsignedByte()/255;for(let M=0,Y=0;p.setFrame(M,g,b,y,v,A,S,I,T),M!=x;M++){let F=e.readFloat(),E=e.readUnsignedByte()/255,k=e.readUnsignedByte()/255,X=e.readUnsignedByte()/255,B=e.readUnsignedByte()/255,N=e.readUnsignedByte()/255,L=e.readUnsignedByte()/255,O=e.readUnsignedByte()/255;switch(e.readByte()){case he:p.setStepped(M);break;case ce:U(e,p,Y++,M,0,g,F,b,E,1),U(e,p,Y++,M,1,g,F,y,k,1),U(e,p,Y++,M,2,g,F,v,X,1),U(e,p,Y++,M,3,g,F,A,B,1),U(e,p,Y++,M,4,g,F,S,N,1),U(e,p,Y++,M,5,g,F,I,L,1),U(e,p,Y++,M,6,g,F,T,O,1)}g=F,b=E,y=k,v=X,A=B,S=N,I=L,T=O}i.push(p);break}case mi:{let w=e.readInt(!0),p=new lt(u,w,c),g=e.readFloat(),b=e.readUnsignedByte()/255,y=e.readUnsignedByte()/255,v=e.readUnsignedByte()/255,A=e.readUnsignedByte()/255,S=e.readUnsignedByte()/255,I=e.readUnsignedByte()/255;for(let T=0,M=0;p.setFrame(T,g,b,y,v,A,S,I),T!=x;T++){let Y=e.readFloat(),F=e.readUnsignedByte()/255,E=e.readUnsignedByte()/255,k=e.readUnsignedByte()/255,X=e.readUnsignedByte()/255,B=e.readUnsignedByte()/255,N=e.readUnsignedByte()/255;switch(e.readByte()){case he:p.setStepped(T);break;case ce:U(e,p,M++,T,0,g,Y,b,F,1),U(e,p,M++,T,1,g,Y,y,E,1),U(e,p,M++,T,2,g,Y,v,k,1),U(e,p,M++,T,3,g,Y,A,X,1),U(e,p,M++,T,4,g,Y,S,B,1),U(e,p,M++,T,5,g,Y,I,N,1)}g=Y,b=F,y=E,v=k,A=X,S=B,I=N}i.push(p);break}case gi:{let w=new at(u,e.readInt(!0),c),p=e.readFloat(),g=e.readUnsignedByte()/255;for(let b=0,y=0;w.setFrame(b,p,g),b!=x;b++){let v=e.readFloat(),A=e.readUnsignedByte()/255;switch(e.readByte()){case he:w.setStepped(b);break;case ce:U(e,w,y++,b,0,p,v,g,A,1)}p=v,g=A}i.push(w)}}}}for(let n=0,l=e.readInt(!0);n<l;n++){let c=e.readInt(!0);for(let d=0,f=e.readInt(!0);d<f;d++){let m=e.readByte(),u=e.readInt(!0);if(m==hi){let w=new st(u,c);for(let p=0;p<u;p++)w.setFrame(p,e.readFloat(),e.readByte());i.push(w);continue}let x=e.readInt(!0);switch(m){case Zs:i.push(ee(e,new Se(u,x,c),1));break;case ei:i.push(Gt(e,new $e(u,x,c),r));break;case ti:i.push(ee(e,new He(u,x,c),r));break;case si:i.push(ee(e,new Je(u,x,c),r));break;case ii:i.push(Gt(e,new je(u,x,c),1));break;case ri:i.push(ee(e,new Ke(u,x,c),1));break;case ai:i.push(ee(e,new Qe(u,x,c),1));break;case ni:i.push(Gt(e,new Ze(u,x,c),1));break;case li:i.push(ee(e,new et(u,x,c),1));break;case oi:i.push(ee(e,new tt(u,x,c),1))}}}for(let n=0,l=e.readInt(!0);n<l;n++){let c=e.readInt(!0),d=e.readInt(!0),f=d-1,m=new ht(d,e.readInt(!0),c),u=e.readByte(),x=e.readFloat(),w=(u&1)!=0?(u&2)!=0?e.readFloat():1:0,p=(u&4)!=0?e.readFloat()*r:0;for(let g=0,b=0;m.setFrame(g,x,w,p,(u&8)!=0?1:-1,(u&16)!=0,(u&32)!=0),g!=f;g++){u=e.readByte();const y=e.readFloat(),v=(u&1)!=0?(u&2)!=0?e.readFloat():1:0,A=(u&4)!=0?e.readFloat()*r:0;(u&64)!=0?m.setStepped(g):(u&128)!=0&&(U(e,m,b++,g,0,x,y,w,v,1),U(e,m,b++,g,1,x,y,p,A,r)),x=y,w=v,p=A}i.push(m)}for(let n=0,l=e.readInt(!0);n<l;n++){let c=e.readInt(!0),d=e.readInt(!0),f=d-1,m=new ct(d,e.readInt(!0),c),u=e.readFloat(),x=e.readFloat(),w=e.readFloat(),p=e.readFloat(),g=e.readFloat(),b=e.readFloat(),y=e.readFloat();for(let v=0,A=0;m.setFrame(v,u,x,w,p,g,b,y),v!=f;v++){let S=e.readFloat(),I=e.readFloat(),T=e.readFloat(),M=e.readFloat(),Y=e.readFloat(),F=e.readFloat(),E=e.readFloat();switch(e.readByte()){case he:m.setStepped(v);break;case ce:U(e,m,A++,v,0,u,S,x,I,1),U(e,m,A++,v,1,u,S,w,T,1),U(e,m,A++,v,2,u,S,p,M,1),U(e,m,A++,v,3,u,S,g,Y,1),U(e,m,A++,v,4,u,S,b,F,1),U(e,m,A++,v,5,u,S,y,E,1)}u=S,x=I,w=T,p=M,g=Y,b=F,y=E}i.push(m)}for(let n=0,l=e.readInt(!0);n<l;n++){let c=e.readInt(!0),d=s.pathConstraints[c];for(let f=0,m=e.readInt(!0);f<m;f++){const u=e.readByte(),x=e.readInt(!0),w=e.readInt(!0);switch(u){case wi:i.push(ee(e,new dt(x,w,c),d.positionMode==0?r:1));break;case pi:i.push(ee(e,new ft(x,w,c),d.spacingMode==0||d.spacingMode==1?r:1));break;case yi:let p=new ut(x,w,c),g=e.readFloat(),b=e.readFloat(),y=e.readFloat(),v=e.readFloat();for(let A=0,S=0,I=p.getFrameCount()-1;p.setFrame(A,g,b,y,v),A!=I;A++){let T=e.readFloat(),M=e.readFloat(),Y=e.readFloat(),F=e.readFloat();switch(e.readByte()){case he:p.setStepped(A);break;case ce:U(e,p,S++,A,0,g,T,b,M,1),U(e,p,S++,A,1,g,T,y,Y,1),U(e,p,S++,A,2,g,T,v,F,1)}g=T,b=M,y=Y,v=F}i.push(p)}}}for(let n=0,l=e.readInt(!0);n<l;n++){const c=e.readInt(!0)-1;for(let d=0,f=e.readInt(!0);d<f;d++){const m=e.readByte(),u=e.readInt(!0);if(m==Yi){const w=new vt(u,c);for(let p=0;p<u;p++)w.setFrame(p,e.readFloat());i.push(w);continue}const x=e.readInt(!0);switch(m){case vi:i.push(ee(e,new mt(u,x,c),1));break;case Ai:i.push(ee(e,new gt(u,x,c),1));break;case Si:i.push(ee(e,new xt(u,x,c),1));break;case Ci:i.push(ee(e,new bt(u,x,c),1));break;case Ii:i.push(ee(e,new wt(u,x,c),1));break;case ki:i.push(ee(e,new pt(u,x,c),1));break;case Ti:i.push(ee(e,new yt(u,x,c),1))}}}for(let n=0,l=e.readInt(!0);n<l;n++){let c=s.skins[e.readInt(!0)];for(let d=0,f=e.readInt(!0);d<f;d++){let m=e.readInt(!0);for(let u=0,x=e.readInt(!0);u<x;u++){let w=e.readStringRef();if(!w)throw new Error("attachmentName must not be null.");let p=c.getAttachment(m,w),g=e.readByte(),b=e.readInt(!0),y=b-1;switch(g){case xi:{let v=p,A=v.bones,S=v.vertices,I=A?S.length/3*2:S.length,T=e.readInt(!0),M=new ot(b,T,m,v),Y=e.readFloat();for(let F=0,E=0;;F++){let k,X=e.readInt(!0);if(X==0)k=A?P.newFloatArray(I):S;else{k=P.newFloatArray(I);let N=e.readInt(!0);if(X+=N,r==1)for(let L=N;L<X;L++)k[L]=e.readFloat();else for(let L=N;L<X;L++)k[L]=e.readFloat()*r;if(!A)for(let L=0,O=k.length;L<O;L++)k[L]+=S[L]}if(M.setFrame(F,Y,k),F==y)break;let B=e.readFloat();switch(e.readByte()){case he:M.setStepped(F);break;case ce:U(e,M,E++,F,0,Y,B,0,1,1)}Y=B}i.push(M);break}case bi:{let v=new At(b,m,p);for(let A=0;A<b;A++){let S=e.readFloat(),I=e.readInt32();v.setFrame(A,S,as[I&15],I>>4,e.readFloat())}i.push(v);break}}}}}let h=e.readInt(!0);if(h>0){let n=new we(h),l=s.slots.length;for(let c=0;c<h;c++){let d=e.readFloat(),f=e.readInt(!0),m=P.newArray(l,0);for(let p=l-1;p>=0;p--)m[p]=-1;let u=P.newArray(l-f,0),x=0,w=0;for(let p=0;p<f;p++){let g=e.readInt(!0);for(;x!=g;)u[w++]=x++;m[x+e.readInt(!0)]=x++}for(;x<l;)u[w++]=x++;for(let p=l-1;p>=0;p--)m[p]==-1&&(m[p]=u[--w]);n.setFrame(c,d,m)}i.push(n)}let o=e.readInt(!0);if(o>0){let n=new Re(o);for(let l=0;l<o;l++){let c=e.readFloat(),d=s.events[e.readInt(!0)],f=new Pt(c,d);f.intValue=e.readInt(!1),f.floatValue=e.readFloat(),f.stringValue=e.readString(),f.stringValue==null&&(f.stringValue=d.stringValue),f.data.audioPath&&(f.volume=e.readFloat(),f.balance=e.readFloat()),n.setFrame(l,f)}i.push(n)}let a=0;for(let n=0,l=i.length;n<l;n++)a=Math.max(a,i[n].getDuration());return new Fe(t,i,a)}},ks=class{constructor(e,t=new Array,s=0,i=new DataView(e instanceof ArrayBuffer?e:e.buffer)){this.strings=t,this.index=s,this.buffer=i}readByte(){return this.buffer.getInt8(this.index++)}readUnsignedByte(){return this.buffer.getUint8(this.index++)}readShort(){let e=this.buffer.getInt16(this.index);return this.index+=2,e}readInt32(){let e=this.buffer.getInt32(this.index);return this.index+=4,e}readInt(e){let t=this.readByte(),s=t&127;return(t&128)!=0&&(t=this.readByte(),s|=(t&127)<<7,(t&128)!=0&&(t=this.readByte(),s|=(t&127)<<14,(t&128)!=0&&(t=this.readByte(),s|=(t&127)<<21,(t&128)!=0&&(t=this.readByte(),s|=(t&127)<<28)))),e?s:s>>>1^-(s&1)}readStringRef(){let e=this.readInt(!0);return e==0?null:this.strings[e-1]}readString(){let e=this.readInt(!0);switch(e){case 0:return null;case 1:return""}e--;let t="",s=0;for(let i=0;i<e;){let r=this.readUnsignedByte();switch(r>>4){case 12:case 13:t+=String.fromCharCode((r&31)<<6|this.readByte()&63),i+=2;break;case 14:t+=String.fromCharCode((r&15)<<12|(this.readByte()&63)<<6|this.readByte()&63),i+=3;break;default:t+=String.fromCharCode(r),i++}}return t}readFloat(){let e=this.buffer.getFloat32(this.index);return this.index+=4,e}readBoolean(){return this.readByte()!=0}},Ks=class{parent;skinIndex;slotIndex;mesh;inheritTimeline;constructor(e,t,s,i,r){this.mesh=e,this.skinIndex=t,this.slotIndex=s,this.parent=i,this.inheritTimeline=r}},Qs=class{constructor(e=null,t=null,s=0){this.bones=e,this.vertices=t,this.length=s}};function ee(e,t,s){let i=e.readFloat(),r=e.readFloat()*s;for(let h=0,o=0,a=t.getFrameCount()-1;t.setFrame(h,i,r),h!=a;h++){let n=e.readFloat(),l=e.readFloat()*s;switch(e.readByte()){case he:t.setStepped(h);break;case ce:U(e,t,o++,h,0,i,n,r,l,s)}i=n,r=l}return t}function Gt(e,t,s){let i=e.readFloat(),r=e.readFloat()*s,h=e.readFloat()*s;for(let o=0,a=0,n=t.getFrameCount()-1;t.setFrame(o,i,r,h),o!=n;o++){let l=e.readFloat(),c=e.readFloat()*s,d=e.readFloat()*s;switch(e.readByte()){case he:t.setStepped(o);break;case ce:U(e,t,a++,o,0,i,l,r,c,s),U(e,t,a++,o,1,i,l,h,d,s)}i=l,r=c,h=d}return t}function U(e,t,s,i,r,h,o,a,n,l){t.setBezier(s,i,r,h,a,e.readFloat(),e.readFloat()*l,e.readFloat(),e.readFloat()*l,o,n)}var Zs=0,ei=1,ti=2,si=3,ii=4,ri=5,ai=6,ni=7,li=8,oi=9,hi=10,ci=0,di=1,fi=2,ui=3,mi=4,gi=5,xi=0,bi=1,wi=0,pi=1,yi=2,vi=0,Ai=1,Si=2,Ci=4,Ii=5,ki=6,Ti=7,Yi=8,he=1,ce=2,Mi=class{minX=0;minY=0;maxX=0;maxY=0;boundingBoxes=new Array;polygons=new Array;polygonPool=new Ae(()=>P.newFloatArray(16));update(e,t){if(!e)throw new Error("skeleton cannot be null.");let s=this.boundingBoxes,i=this.polygons,r=this.polygonPool,h=e.slots,o=h.length;s.length=0,r.freeAll(i),i.length=0;for(let a=0;a<o;a++){let n=h[a];if(!n.bone.active)continue;let l=n.getAttachment();if(l instanceof kt){let c=l;s.push(c);let d=r.obtain();d.length!=c.worldVerticesLength&&(d=P.newFloatArray(c.worldVerticesLength)),i.push(d),c.computeWorldVertices(n,0,c.worldVerticesLength,d,0,2)}}t?this.aabbCompute():(this.minX=Number.POSITIVE_INFINITY,this.minY=Number.POSITIVE_INFINITY,this.maxX=Number.NEGATIVE_INFINITY,this.maxY=Number.NEGATIVE_INFINITY)}aabbCompute(){let e=Number.POSITIVE_INFINITY,t=Number.POSITIVE_INFINITY,s=Number.NEGATIVE_INFINITY,i=Number.NEGATIVE_INFINITY,r=this.polygons;for(let h=0,o=r.length;h<o;h++){let a=r[h],n=a;for(let l=0,c=a.length;l<c;l+=2){let d=n[l],f=n[l+1];e=Math.min(e,d),t=Math.min(t,f),s=Math.max(s,d),i=Math.max(i,f)}}this.minX=e,this.minY=t,this.maxX=s,this.maxY=i}aabbContainsPoint(e,t){return e>=this.minX&&e<=this.maxX&&t>=this.minY&&t<=this.maxY}aabbIntersectsSegment(e,t,s,i){let r=this.minX,h=this.minY,o=this.maxX,a=this.maxY;if(e<=r&&s<=r||t<=h&&i<=h||e>=o&&s>=o||t>=a&&i>=a)return!1;let n=(i-t)/(s-e),l=n*(r-e)+t;if(l>h&&l<a||(l=n*(o-e)+t,l>h&&l<a))return!0;let c=(h-t)/n+e;return c>r&&c<o||(c=(a-t)/n+e,c>r&&c<o)}aabbIntersectsSkeleton(e){return this.minX<e.maxX&&this.maxX>e.minX&&this.minY<e.maxY&&this.maxY>e.minY}containsPoint(e,t){let s=this.polygons;for(let i=0,r=s.length;i<r;i++)if(this.containsPointPolygon(s[i],e,t))return this.boundingBoxes[i];return null}containsPointPolygon(e,t,s){let i=e,r=e.length,h=r-2,o=!1;for(let a=0;a<r;a+=2){let n=i[a+1],l=i[h+1];if(n<s&&l>=s||l<s&&n>=s){let c=i[a];c+(s-n)/(l-n)*(i[h]-c)<t&&(o=!o)}h=a}return o}intersectsSegment(e,t,s,i){let r=this.polygons;for(let h=0,o=r.length;h<o;h++)if(this.intersectsSegmentPolygon(r[h],e,t,s,i))return this.boundingBoxes[h];return null}intersectsSegmentPolygon(e,t,s,i,r){let h=e,o=e.length,a=t-i,n=s-r,l=t*r-s*i,c=h[o-2],d=h[o-1];for(let f=0;f<o;f+=2){let m=h[f],u=h[f+1],x=c*u-d*m,w=c-m,p=d-u,g=a*p-n*w,b=(l*w-a*x)/g;if((b>=c&&b<=m||b>=m&&b<=c)&&(b>=t&&b<=i||b>=i&&b<=t)){let y=(l*p-n*x)/g;if((y>=d&&y<=u||y>=u&&y<=d)&&(y>=s&&y<=r||y>=r&&y<=s))return!0}c=m,d=u}return!1}getPolygon(e){if(!e)throw new Error("boundingBox cannot be null.");let t=this.boundingBoxes.indexOf(e);return t==-1?null:this.polygons[t]}getWidth(){return this.maxX-this.minX}getHeight(){return this.maxY-this.minY}},Ts=class se{convexPolygons=new Array;convexPolygonsIndices=new Array;indicesArray=new Array;isConcaveArray=new Array;triangles=new Array;polygonPool=new Ae(()=>new Array);polygonIndicesPool=new Ae(()=>new Array);triangulate(t){let s=t,i=t.length>>1,r=this.indicesArray;r.length=0;for(let a=0;a<i;a++)r[a]=a;let h=this.isConcaveArray;h.length=0;for(let a=0,n=i;a<n;++a)h[a]=se.isConcave(a,i,s,r);let o=this.triangles;for(o.length=0;i>3;){let a=i-1,n=0,l=1;for(;;){e:if(!h[n]){let f=r[a]<<1,m=r[n]<<1,u=r[l]<<1,x=s[f],w=s[f+1],p=s[m],g=s[m+1],b=s[u],y=s[u+1];for(let v=(l+1)%i;v!=a;v=(v+1)%i){if(!h[v])continue;let A=r[v]<<1,S=s[A],I=s[A+1];if(se.positiveArea(b,y,x,w,S,I)&&se.positiveArea(x,w,p,g,S,I)&&se.positiveArea(p,g,b,y,S,I))break e}break}if(l==0){do{if(!h[n])break;n--}while(n>0);break}a=n,n=l,l=(l+1)%i}o.push(r[(i+n-1)%i]),o.push(r[n]),o.push(r[(n+1)%i]),r.splice(n,1),h.splice(n,1),i--;let c=(i+n-1)%i,d=n==i?0:n;h[c]=se.isConcave(c,i,s,r),h[d]=se.isConcave(d,i,s,r)}return i==3&&(o.push(r[2]),o.push(r[0]),o.push(r[1])),o}decompose(t,s){let i=t,r=this.convexPolygons;this.polygonPool.freeAll(r),r.length=0;let h=this.convexPolygonsIndices;this.polygonIndicesPool.freeAll(h),h.length=0;let o=this.polygonIndicesPool.obtain();o.length=0;let a=this.polygonPool.obtain();a.length=0;let n=-1,l=0;for(let c=0,d=s.length;c<d;c+=3){let f=s[c]<<1,m=s[c+1]<<1,u=s[c+2]<<1,x=i[f],w=i[f+1],p=i[m],g=i[m+1],b=i[u],y=i[u+1],v=!1;if(n==f){let A=a.length-4,S=se.winding(a[A],a[A+1],a[A+2],a[A+3],b,y),I=se.winding(b,y,a[0],a[1],a[2],a[3]);S==l&&I==l&&(a.push(b),a.push(y),o.push(u),v=!0)}v||(a.length>0?(r.push(a),h.push(o)):(this.polygonPool.free(a),this.polygonIndicesPool.free(o)),a=this.polygonPool.obtain(),a.length=0,a.push(x),a.push(w),a.push(p),a.push(g),a.push(b),a.push(y),o=this.polygonIndicesPool.obtain(),o.length=0,o.push(f),o.push(m),o.push(u),l=se.winding(x,w,p,g,b,y),n=f)}a.length>0&&(r.push(a),h.push(o));for(let c=0,d=r.length;c<d;c++){if(o=h[c],o.length==0)continue;let f=o[0],m=o[o.length-1];a=r[c];let u=a.length-4,x=a[u],w=a[u+1],p=a[u+2],g=a[u+3],b=a[0],y=a[1],v=a[2],A=a[3],S=se.winding(x,w,p,g,b,y);for(let I=0;I<d;I++){if(I==c)continue;let T=h[I];if(T.length!=3)continue;let M=T[0],Y=T[1],F=T[2],E=r[I],k=E[E.length-2],X=E[E.length-1];if(M!=f||Y!=m)continue;let B=se.winding(x,w,p,g,k,X),N=se.winding(k,X,b,y,v,A);B==S&&N==S&&(E.length=0,T.length=0,a.push(k),a.push(X),o.push(F),x=p,w=g,p=k,g=X,I=0)}}for(let c=r.length-1;c>=0;c--)a=r[c],a.length==0&&(r.splice(c,1),this.polygonPool.free(a),o=h[c],h.splice(c,1),this.polygonIndicesPool.free(o));return r}static isConcave(t,s,i,r){let h=r[(s+t-1)%s]<<1,o=r[t]<<1,a=r[(t+1)%s]<<1;return!this.positiveArea(i[h],i[h+1],i[o],i[o+1],i[a],i[a+1])}static positiveArea(t,s,i,r,h,o){return t*(o-r)+i*(s-o)+h*(r-s)>=0}static winding(t,s,i,r,h,o){let a=i-t,n=r-s;return h*n-o*a+a*s-t*n>=0?1:-1}},Xi=class jt{triangulator=new Ts;clippingPolygon=new Array;clipOutput=new Array;clippedVertices=new Array;clippedUVs=new Array;clippedTriangles=new Array;scratch=new Array;clipAttachment=null;clippingPolygons=null;clipStart(t,s){if(this.clipAttachment)return 0;this.clipAttachment=s;let i=s.worldVerticesLength,r=P.setArraySize(this.clippingPolygon,i);s.computeWorldVertices(t,0,i,r,0,2);let h=this.clippingPolygon;jt.makeClockwise(h);let o=this.clippingPolygons=this.triangulator.decompose(h,this.triangulator.triangulate(h));for(let a=0,n=o.length;a<n;a++){let l=o[a];jt.makeClockwise(l),l.push(l[0]),l.push(l[1])}return o.length}clipEndWithSlot(t){this.clipAttachment&&this.clipAttachment.endSlot==t.data&&this.clipEnd()}clipEnd(){this.clipAttachment&&(this.clipAttachment=null,this.clippingPolygons=null,this.clippedVertices.length=0,this.clippedTriangles.length=0,this.clippingPolygon.length=0)}isClipping(){return this.clipAttachment!=null}clipTriangles(t,s,i,r,h,o,a,n){let l,c,d,f,m,u;typeof s=="number"?(l=i,c=r,d=h,f=o,m=a,u=n):(l=s,c=i,d=r,f=h,m=o,u=a),d&&f&&m&&typeof u=="boolean"?this.clipTrianglesRender(t,l,c,d,f,m,u):this.clipTrianglesNoRender(t,l,c)}clipTrianglesNoRender(t,s,i){let r=this.clipOutput,h=this.clippedVertices,o=this.clippedTriangles,a=this.clippingPolygons,n=a.length,l=0;h.length=0,o.length=0;for(let c=0;c<i;c+=3){let d=s[c]<<1,f=t[d],m=t[d+1];d=s[c+1]<<1;let u=t[d],x=t[d+1];d=s[c+2]<<1;let w=t[d],p=t[d+1];for(let g=0;g<n;g++){let b=h.length;if(this.clip(f,m,u,x,w,p,a[g],r)){let y=r.length;if(y==0)continue;let v=y>>1,A=this.clipOutput,S=P.setArraySize(h,b+v*2);for(let T=0;T<y;T+=2,b+=2){let M=A[T],Y=A[T+1];S[b]=M,S[b+1]=Y}b=o.length;let I=P.setArraySize(o,b+3*(v-2));v--;for(let T=1;T<v;T++,b+=3)I[b]=l,I[b+1]=l+T,I[b+2]=l+T+1;l+=v+1}else{let y=P.setArraySize(h,b+6);y[b]=f,y[b+1]=m,y[b+2]=u,y[b+3]=x,y[b+4]=w,y[b+5]=p,b=o.length;let v=P.setArraySize(o,b+3);v[b]=l,v[b+1]=l+1,v[b+2]=l+2,l+=3;break}}}}clipTrianglesRender(t,s,i,r,h,o,a){let n=this.clipOutput,l=this.clippedVertices,c=this.clippedTriangles,d=this.clippingPolygons,f=d.length,m=a?12:8,u=0;l.length=0,c.length=0;for(let x=0;x<i;x+=3){let w=s[x]<<1,p=t[w],g=t[w+1],b=r[w],y=r[w+1];w=s[x+1]<<1;let v=t[w],A=t[w+1],S=r[w],I=r[w+1];w=s[x+2]<<1;let T=t[w],M=t[w+1],Y=r[w],F=r[w+1];for(let E=0;E<f;E++){let k=l.length;if(this.clip(p,g,v,A,T,M,d[E],n)){let X=n.length;if(X==0)continue;let B=A-M,N=T-v,L=p-T,O=M-g,$=1/(B*L+N*(g-M)),z=X>>1,j=this.clipOutput,V=P.setArraySize(l,k+z*m);for(let G=0;G<X;G+=2,k+=m){let te=j[G],K=j[G+1];V[k]=te,V[k+1]=K,V[k+2]=h.r,V[k+3]=h.g,V[k+4]=h.b,V[k+5]=h.a;let Q=te-T,Z=K-M,re=(B*Q+N*Z)*$,xe=(O*Q+L*Z)*$,ye=1-re-xe;V[k+6]=b*re+S*xe+Y*ye,V[k+7]=y*re+I*xe+F*ye,a&&(V[k+8]=o.r,V[k+9]=o.g,V[k+10]=o.b,V[k+11]=o.a)}k=c.length;let W=P.setArraySize(c,k+3*(z-2));z--;for(let G=1;G<z;G++,k+=3)W[k]=u,W[k+1]=u+G,W[k+2]=u+G+1;u+=z+1}else{let X=P.setArraySize(l,k+3*m);X[k]=p,X[k+1]=g,X[k+2]=h.r,X[k+3]=h.g,X[k+4]=h.b,X[k+5]=h.a,a?(X[k+6]=b,X[k+7]=y,X[k+8]=o.r,X[k+9]=o.g,X[k+10]=o.b,X[k+11]=o.a,X[k+12]=v,X[k+13]=A,X[k+14]=h.r,X[k+15]=h.g,X[k+16]=h.b,X[k+17]=h.a,X[k+18]=S,X[k+19]=I,X[k+20]=o.r,X[k+21]=o.g,X[k+22]=o.b,X[k+23]=o.a,X[k+24]=T,X[k+25]=M,X[k+26]=h.r,X[k+27]=h.g,X[k+28]=h.b,X[k+29]=h.a,X[k+30]=Y,X[k+31]=F,X[k+32]=o.r,X[k+33]=o.g,X[k+34]=o.b,X[k+35]=o.a):(X[k+6]=b,X[k+7]=y,X[k+8]=v,X[k+9]=A,X[k+10]=h.r,X[k+11]=h.g,X[k+12]=h.b,X[k+13]=h.a,X[k+14]=S,X[k+15]=I,X[k+16]=T,X[k+17]=M,X[k+18]=h.r,X[k+19]=h.g,X[k+20]=h.b,X[k+21]=h.a,X[k+22]=Y,X[k+23]=F),k=c.length;let B=P.setArraySize(c,k+3);B[k]=u,B[k+1]=u+1,B[k+2]=u+2,u+=3;break}}}}clipTrianglesUnpacked(t,s,i,r){let h=this.clipOutput,o=this.clippedVertices,a=this.clippedUVs,n=this.clippedTriangles,l=this.clippingPolygons,c=l.length,d=0;o.length=0,a.length=0,n.length=0;for(let f=0;f<i;f+=3){let m=s[f]<<1,u=t[m],x=t[m+1],w=r[m],p=r[m+1];m=s[f+1]<<1;let g=t[m],b=t[m+1],y=r[m],v=r[m+1];m=s[f+2]<<1;let A=t[m],S=t[m+1],I=r[m],T=r[m+1];for(let M=0;M<c;M++){let Y=o.length;if(this.clip(u,x,g,b,A,S,l[M],h)){let F=h.length;if(F==0)continue;let E=b-S,k=A-g,X=u-A,B=S-x,N=1/(E*X+k*(x-S)),L=F>>1,O=this.clipOutput,$=P.setArraySize(o,Y+L*2),z=P.setArraySize(a,Y+L*2);for(let V=0;V<F;V+=2,Y+=2){let W=O[V],G=O[V+1];$[Y]=W,$[Y+1]=G;let te=W-A,K=G-S,Q=(E*te+k*K)*N,Z=(B*te+X*K)*N,re=1-Q-Z;z[Y]=w*Q+y*Z+I*re,z[Y+1]=p*Q+v*Z+T*re}Y=n.length;let j=P.setArraySize(n,Y+3*(L-2));L--;for(let V=1;V<L;V++,Y+=3)j[Y]=d,j[Y+1]=d+V,j[Y+2]=d+V+1;d+=L+1}else{let F=P.setArraySize(o,Y+6);F[Y]=u,F[Y+1]=x,F[Y+2]=g,F[Y+3]=b,F[Y+4]=A,F[Y+5]=S;let E=P.setArraySize(a,Y+3*2);E[Y]=w,E[Y+1]=p,E[Y+2]=y,E[Y+3]=v,E[Y+4]=I,E[Y+5]=T,Y=n.length;let k=P.setArraySize(n,Y+3);k[Y]=d,k[Y+1]=d+1,k[Y+2]=d+2,d+=3;break}}}}clip(t,s,i,r,h,o,a,n){let l=n,c=!1,d;a.length%4>=2?(d=n,n=this.scratch):d=this.scratch,d.length=0,d.push(t),d.push(s),d.push(i),d.push(r),d.push(h),d.push(o),d.push(t),d.push(s),n.length=0;let f=a.length-4,m=a;for(let u=0;;u+=2){let x=m[u],w=m[u+1],p=x-m[u+2],g=w-m[u+3],b=n.length,y=d;for(let A=0,S=d.length-2;A<S;){let I=y[A],T=y[A+1];A+=2;let M=y[A],Y=y[A+1],F=g*(x-M)>p*(w-Y),E=g*(x-I)-p*(w-T);if(E>0){if(F){n.push(M),n.push(Y);continue}let k=M-I,X=Y-T,B=E/(k*g-X*p);if(B>=0&&B<=1)n.push(I+k*B),n.push(T+X*B);else{n.push(M),n.push(Y);continue}}else if(F){let k=M-I,X=Y-T,B=E/(k*g-X*p);if(B>=0&&B<=1)n.push(I+k*B),n.push(T+X*B),n.push(M),n.push(Y);else{n.push(M),n.push(Y);continue}}c=!0}if(b==n.length)return l.length=0,!0;if(n.push(n[0]),n.push(n[1]),u==f)break;let v=n;n=d,n.length=0,d=v}if(l!=n){l.length=0;for(let u=0,x=n.length-2;u<x;u++)l[u]=n[u]}else l.length=l.length-2;return c}static makeClockwise(t){let s=t,i=t.length,r=s[i-2]*s[1]-s[0]*s[i-1],h=0,o=0,a=0,n=0;for(let l=0,c=i-3;l<c;l+=2)h=s[l],o=s[l+1],a=s[l+2],n=s[l+3],r+=h*n-a*o;if(!(r<0))for(let l=0,c=i-2,d=i>>1;l<d;l+=2){let f=s[l],m=s[l+1],u=c-l;s[l]=s[u],s[l+1]=s[u+1],s[u]=f,s[u+1]=m}}},Fi=class{attachmentLoader;scale=1;linkedMeshes=new Array;constructor(e){this.attachmentLoader=e}readSkeletonData(e){let t=this.scale,s=new qt,i=typeof e=="string"?JSON.parse(e):e,r=i.skeleton;if(r&&(s.hash=r.hash,s.version=r.spine,s.x=r.x,s.y=r.y,s.width=r.width,s.height=r.height,s.referenceScale=C(r,"referenceScale",100)*t,s.fps=r.fps,s.imagesPath=r.images??null,s.audioPath=r.audio??null),i.bones)for(let h=0;h<i.bones.length;h++){let o=i.bones[h],a=null,n=C(o,"parent",null);n&&(a=s.findBone(n));let l=new Ft(s.bones.length,o.name,a);l.length=C(o,"length",0)*t,l.x=C(o,"x",0)*t,l.y=C(o,"y",0)*t,l.rotation=C(o,"rotation",0),l.scaleX=C(o,"scaleX",1),l.scaleY=C(o,"scaleY",1),l.shearX=C(o,"shearX",0),l.shearY=C(o,"shearY",0),l.inherit=P.enumValue(Le,C(o,"inherit","Normal")),l.skinRequired=C(o,"skin",!1);let c=C(o,"color",null);c&&l.color.setFromString(c),s.bones.push(l)}if(i.slots)for(let h=0;h<i.slots.length;h++){let o=i.slots[h],a=o.name,n=s.findBone(o.bone);if(!n)throw new Error(`Couldn't find bone ${o.bone} for slot ${a}`);let l=new Ut(s.slots.length,a,n),c=C(o,"color",null);c&&l.color.setFromString(c);let d=C(o,"dark",null);d&&(l.darkColor=D.fromString(d)),l.attachmentName=C(o,"attachment",null),l.blendMode=P.enumValue(zt,C(o,"blend","normal")),l.visible=C(o,"visible",!0),s.slots.push(l)}if(i.ik)for(let h=0;h<i.ik.length;h++){let o=i.ik[h],a=new Vt(o.name);a.order=C(o,"order",0),a.skinRequired=C(o,"skin",!1);for(let l=0;l<o.bones.length;l++){let c=s.findBone(o.bones[l]);if(!c)throw new Error(`Couldn't find bone ${o.bones[l]} for IK constraint ${o.name}.`);a.bones.push(c)}let n=s.findBone(o.target);if(!n)throw new Error(`Couldn't find target bone ${o.target} for IK constraint ${o.name}.`);a.target=n,a.mix=C(o,"mix",1),a.softness=C(o,"softness",0)*t,a.bendDirection=C(o,"bendPositive",!0)?1:-1,a.compress=C(o,"compress",!1),a.stretch=C(o,"stretch",!1),a.uniform=C(o,"uniform",!1),s.ikConstraints.push(a)}if(i.transform)for(let h=0;h<i.transform.length;h++){let o=i.transform[h],a=new _t(o.name);a.order=C(o,"order",0),a.skinRequired=C(o,"skin",!1);for(let c=0;c<o.bones.length;c++){let d=o.bones[c],f=s.findBone(d);if(!f)throw new Error(`Couldn't find bone ${d} for transform constraint ${o.name}.`);a.bones.push(f)}let n=o.target,l=s.findBone(n);if(!l)throw new Error(`Couldn't find target bone ${n} for transform constraint ${o.name}.`);a.target=l,a.local=C(o,"local",!1),a.relative=C(o,"relative",!1),a.offsetRotation=C(o,"rotation",0),a.offsetX=C(o,"x",0)*t,a.offsetY=C(o,"y",0)*t,a.offsetScaleX=C(o,"scaleX",0),a.offsetScaleY=C(o,"scaleY",0),a.offsetShearY=C(o,"shearY",0),a.mixRotate=C(o,"mixRotate",1),a.mixX=C(o,"mixX",1),a.mixY=C(o,"mixY",a.mixX),a.mixScaleX=C(o,"mixScaleX",1),a.mixScaleY=C(o,"mixScaleY",a.mixScaleX),a.mixShearY=C(o,"mixShearY",1),s.transformConstraints.push(a)}if(i.path)for(let h=0;h<i.path.length;h++){let o=i.path[h],a=new Lt(o.name);a.order=C(o,"order",0),a.skinRequired=C(o,"skin",!1);for(let c=0;c<o.bones.length;c++){let d=o.bones[c],f=s.findBone(d);if(!f)throw new Error(`Couldn't find bone ${d} for path constraint ${o.name}.`);a.bones.push(f)}let n=o.target,l=s.findSlot(n);if(!l)throw new Error(`Couldn't find target slot ${n} for path constraint ${o.name}.`);a.target=l,a.positionMode=P.enumValue(Nt,C(o,"positionMode","Percent")),a.spacingMode=P.enumValue(Ot,C(o,"spacingMode","Length")),a.rotateMode=P.enumValue(Dt,C(o,"rotateMode","Tangent")),a.offsetRotation=C(o,"rotation",0),a.position=C(o,"position",0),a.positionMode==0&&(a.position*=t),a.spacing=C(o,"spacing",0),(a.spacingMode==0||a.spacingMode==1)&&(a.spacing*=t),a.mixRotate=C(o,"mixRotate",1),a.mixX=C(o,"mixX",1),a.mixY=C(o,"mixY",a.mixX),s.pathConstraints.push(a)}if(i.physics)for(let h=0;h<i.physics.length;h++){const o=i.physics[h],a=new Is(o.name);a.order=C(o,"order",0),a.skinRequired=C(o,"skin",!1);const n=o.bone,l=s.findBone(n);if(l==null)throw new Error("Physics bone not found: "+n);a.bone=l,a.x=C(o,"x",0),a.y=C(o,"y",0),a.rotate=C(o,"rotate",0),a.scaleX=C(o,"scaleX",0),a.shearX=C(o,"shearX",0),a.limit=C(o,"limit",5e3)*t,a.step=1/C(o,"fps",60),a.inertia=C(o,"inertia",1),a.strength=C(o,"strength",100),a.damping=C(o,"damping",1),a.massInverse=1/C(o,"mass",1),a.wind=C(o,"wind",0),a.gravity=C(o,"gravity",0),a.mix=C(o,"mix",1),a.inertiaGlobal=C(o,"inertiaGlobal",!1),a.strengthGlobal=C(o,"strengthGlobal",!1),a.dampingGlobal=C(o,"dampingGlobal",!1),a.massGlobal=C(o,"massGlobal",!1),a.windGlobal=C(o,"windGlobal",!1),a.gravityGlobal=C(o,"gravityGlobal",!1),a.mixGlobal=C(o,"mixGlobal",!1),s.physicsConstraints.push(a)}if(i.skins)for(let h=0;h<i.skins.length;h++){let o=i.skins[h],a=new Ne(o.name);if(o.bones)for(let n=0;n<o.bones.length;n++){let l=o.bones[n],c=s.findBone(l);if(!c)throw new Error(`Couldn't find bone ${l} for skin ${o.name}.`);a.bones.push(c)}if(o.ik)for(let n=0;n<o.ik.length;n++){let l=o.ik[n],c=s.findIkConstraint(l);if(!c)throw new Error(`Couldn't find IK constraint ${l} for skin ${o.name}.`);a.constraints.push(c)}if(o.transform)for(let n=0;n<o.transform.length;n++){let l=o.transform[n],c=s.findTransformConstraint(l);if(!c)throw new Error(`Couldn't find transform constraint ${l} for skin ${o.name}.`);a.constraints.push(c)}if(o.path)for(let n=0;n<o.path.length;n++){let l=o.path[n],c=s.findPathConstraint(l);if(!c)throw new Error(`Couldn't find path constraint ${l} for skin ${o.name}.`);a.constraints.push(c)}if(o.physics)for(let n=0;n<o.physics.length;n++){let l=o.physics[n],c=s.findPhysicsConstraint(l);if(!c)throw new Error(`Couldn't find physics constraint ${l} for skin ${o.name}.`);a.constraints.push(c)}for(let n in o.attachments){let l=s.findSlot(n);if(!l)throw new Error(`Couldn't find slot ${n} for skin ${o.name}.`);let c=o.attachments[n];for(let d in c){let f=this.readAttachment(c[d],a,l.index,d,s);f&&a.setAttachment(l.index,d,f)}}s.skins.push(a),a.name=="default"&&(s.defaultSkin=a)}for(let h=0,o=this.linkedMeshes.length;h<o;h++){let a=this.linkedMeshes[h],n=a.skin?s.findSkin(a.skin):s.defaultSkin;if(!n)throw new Error(`Skin not found: ${a.skin}`);let l=n.getAttachment(a.slotIndex,a.parent);if(!l)throw new Error(`Parent mesh not found: ${a.parent}`);a.mesh.timelineAttachment=a.inheritTimeline?l:a.mesh,a.mesh.setParentMesh(l),a.mesh.region!=null&&a.mesh.updateRegion()}if(this.linkedMeshes.length=0,i.events)for(let h in i.events){let o=i.events[h],a=new Bt(h);a.intValue=C(o,"int",0),a.floatValue=C(o,"float",0),a.stringValue=C(o,"string",""),a.audioPath=C(o,"audio",null),a.audioPath&&(a.volume=C(o,"volume",1),a.balance=C(o,"balance",0)),s.events.push(a)}if(i.animations)for(let h in i.animations){let o=i.animations[h];this.readAnimation(o,h,s)}return s}readAttachment(e,t,s,i,r){let h=this.scale;switch(i=C(e,"name",i),C(e,"type","region")){case"region":{let o=C(e,"path",i),a=this.readSequence(C(e,"sequence",null)),n=this.attachmentLoader.newRegionAttachment(t,i,o,a);if(!n)return null;n.path=o,n.x=C(e,"x",0)*h,n.y=C(e,"y",0)*h,n.scaleX=C(e,"scaleX",1),n.scaleY=C(e,"scaleY",1),n.rotation=C(e,"rotation",0),n.width=e.width*h,n.height=e.height*h,n.sequence=a;let l=C(e,"color",null);return l&&n.color.setFromString(l),n.region!=null&&n.updateRegion(),n}case"boundingbox":{let o=this.attachmentLoader.newBoundingBoxAttachment(t,i);if(!o)return null;this.readVertices(e,o,e.vertexCount<<1);let a=C(e,"color",null);return a&&o.color.setFromString(a),o}case"mesh":case"linkedmesh":{let o=C(e,"path",i),a=this.readSequence(C(e,"sequence",null)),n=this.attachmentLoader.newMeshAttachment(t,i,o,a);if(!n)return null;n.path=o;let l=C(e,"color",null);l&&n.color.setFromString(l),n.width=C(e,"width",0)*h,n.height=C(e,"height",0)*h,n.sequence=a;let c=C(e,"parent",null);if(c)return this.linkedMeshes.push(new Ei(n,C(e,"skin",null),s,c,C(e,"timelines",!0))),n;let d=e.uvs;return this.readVertices(e,n,d.length),n.triangles=e.triangles,n.regionUVs=d,n.region!=null&&n.updateRegion(),n.edges=C(e,"edges",null),n.hullLength=C(e,"hull",0)*2,n}case"path":{let o=this.attachmentLoader.newPathAttachment(t,i);if(!o)return null;o.closed=C(e,"closed",!1),o.constantSpeed=C(e,"constantSpeed",!0);let a=e.vertexCount;this.readVertices(e,o,a<<1);let n=P.newArray(a/3,0);for(let c=0;c<e.lengths.length;c++)n[c]=e.lengths[c]*h;o.lengths=n;let l=C(e,"color",null);return l&&o.color.setFromString(l),o}case"point":{let o=this.attachmentLoader.newPointAttachment(t,i);if(!o)return null;o.x=C(e,"x",0)*h,o.y=C(e,"y",0)*h,o.rotation=C(e,"rotation",0);let a=C(e,"color",null);return a&&o.color.setFromString(a),o}case"clipping":{let o=this.attachmentLoader.newClippingAttachment(t,i);if(!o)return null;let a=C(e,"end",null);a&&(o.endSlot=r.findSlot(a));let n=e.vertexCount;this.readVertices(e,o,n<<1);let l=C(e,"color",null);return l&&o.color.setFromString(l),o}}return null}readSequence(e){if(e==null)return null;let t=new is(C(e,"count",0));return t.start=C(e,"start",1),t.digits=C(e,"digits",0),t.setupIndex=C(e,"setup",0),t}readVertices(e,t,s){let i=this.scale;t.worldVerticesLength=s;let r=e.vertices;if(s==r.length){let a=P.toFloatArray(r);if(i!=1)for(let n=0,l=r.length;n<l;n++)a[n]*=i;t.vertices=a;return}let h=new Array,o=new Array;for(let a=0,n=r.length;a<n;){let l=r[a++];o.push(l);for(let c=a+l*4;a<c;a+=4)o.push(r[a]),h.push(r[a+1]*i),h.push(r[a+2]*i),h.push(r[a+3])}t.bones=o,t.vertices=P.toFloatArray(h)}readAnimation(e,t,s){let i=this.scale,r=new Array;if(e.slots)for(let o in e.slots){let a=e.slots[o],n=s.findSlot(o);if(!n)throw new Error("Slot not found: "+o);let l=n.index;for(let c in a){let d=a[c];if(!d)continue;let f=d.length;if(c=="attachment"){let m=new me(f,l);for(let u=0;u<f;u++){let x=d[u];m.setFrame(u,C(x,"time",0),C(x,"name",null))}r.push(m)}else if(c=="rgba"){let m=new it(f,f<<2,l),u=d[0],x=C(u,"time",0),w=D.fromString(u.color);for(let p=0,g=0;;p++){m.setFrame(p,x,w.r,w.g,w.b,w.a);let b=d[p+1];if(!b){m.shrink(g);break}let y=C(b,"time",0),v=D.fromString(b.color),A=u.curve;A&&(g=_(A,m,g,p,0,x,y,w.r,v.r,1),g=_(A,m,g,p,1,x,y,w.g,v.g,1),g=_(A,m,g,p,2,x,y,w.b,v.b,1),g=_(A,m,g,p,3,x,y,w.a,v.a,1)),x=y,w=v,u=b}r.push(m)}else if(c=="rgb"){let m=new rt(f,f*3,l),u=d[0],x=C(u,"time",0),w=D.fromString(u.color);for(let p=0,g=0;;p++){m.setFrame(p,x,w.r,w.g,w.b);let b=d[p+1];if(!b){m.shrink(g);break}let y=C(b,"time",0),v=D.fromString(b.color),A=u.curve;A&&(g=_(A,m,g,p,0,x,y,w.r,v.r,1),g=_(A,m,g,p,1,x,y,w.g,v.g,1),g=_(A,m,g,p,2,x,y,w.b,v.b,1)),x=y,w=v,u=b}r.push(m)}else if(c=="alpha")r.push(ne(d,new at(f,f,l),0,1));else if(c=="rgba2"){let m=new nt(f,f*7,l),u=d[0],x=C(u,"time",0),w=D.fromString(u.light),p=D.fromString(u.dark);for(let g=0,b=0;;g++){m.setFrame(g,x,w.r,w.g,w.b,w.a,p.r,p.g,p.b);let y=d[g+1];if(!y){m.shrink(b);break}let v=C(y,"time",0),A=D.fromString(y.light),S=D.fromString(y.dark),I=u.curve;I&&(b=_(I,m,b,g,0,x,v,w.r,A.r,1),b=_(I,m,b,g,1,x,v,w.g,A.g,1),b=_(I,m,b,g,2,x,v,w.b,A.b,1),b=_(I,m,b,g,3,x,v,w.a,A.a,1),b=_(I,m,b,g,4,x,v,p.r,S.r,1),b=_(I,m,b,g,5,x,v,p.g,S.g,1),b=_(I,m,b,g,6,x,v,p.b,S.b,1)),x=v,w=A,p=S,u=y}r.push(m)}else if(c=="rgb2"){let m=new lt(f,f*6,l),u=d[0],x=C(u,"time",0),w=D.fromString(u.light),p=D.fromString(u.dark);for(let g=0,b=0;;g++){m.setFrame(g,x,w.r,w.g,w.b,p.r,p.g,p.b);let y=d[g+1];if(!y){m.shrink(b);break}let v=C(y,"time",0),A=D.fromString(y.light),S=D.fromString(y.dark),I=u.curve;I&&(b=_(I,m,b,g,0,x,v,w.r,A.r,1),b=_(I,m,b,g,1,x,v,w.g,A.g,1),b=_(I,m,b,g,2,x,v,w.b,A.b,1),b=_(I,m,b,g,3,x,v,p.r,S.r,1),b=_(I,m,b,g,4,x,v,p.g,S.g,1),b=_(I,m,b,g,5,x,v,p.b,S.b,1)),x=v,w=A,p=S,u=y}r.push(m)}}}if(e.bones)for(let o in e.bones){let a=e.bones[o],n=s.findBone(o);if(!n)throw new Error("Bone not found: "+o);let l=n.index;for(let c in a){let d=a[c],f=d.length;if(f!=0){if(c==="rotate")r.push(ne(d,new Se(f,f,l),0,1));else if(c==="translate"){let m=new $e(f,f<<1,l);r.push($t(d,m,"x","y",0,i))}else if(c==="translatex"){let m=new He(f,f,l);r.push(ne(d,m,0,i))}else if(c==="translatey"){let m=new Je(f,f,l);r.push(ne(d,m,0,i))}else if(c==="scale"){let m=new je(f,f<<1,l);r.push($t(d,m,"x","y",1,1))}else if(c==="scalex"){let m=new Ke(f,f,l);r.push(ne(d,m,1,1))}else if(c==="scaley"){let m=new Qe(f,f,l);r.push(ne(d,m,1,1))}else if(c==="shear"){let m=new Ze(f,f<<1,l);r.push($t(d,m,"x","y",0,1))}else if(c==="shearx"){let m=new et(f,f,l);r.push(ne(d,m,0,1))}else if(c==="sheary"){let m=new tt(f,f,l);r.push(ne(d,m,0,1))}else if(c==="inherit"){let m=new st(f,n.index);for(let u=0;u<d.length;u++){let x=d[u];m.setFrame(u,C(x,"time",0),P.enumValue(Le,C(x,"inherit","Normal")))}r.push(m)}}}}if(e.ik)for(let o in e.ik){let a=e.ik[o],n=a[0];if(!n)continue;let l=s.findIkConstraint(o);if(!l)throw new Error("IK Constraint not found: "+o);let c=s.ikConstraints.indexOf(l),d=new ht(a.length,a.length<<1,c),f=C(n,"time",0),m=C(n,"mix",1),u=C(n,"softness",0)*i;for(let x=0,w=0;;x++){d.setFrame(x,f,m,u,C(n,"bendPositive",!0)?1:-1,C(n,"compress",!1),C(n,"stretch",!1));let p=a[x+1];if(!p){d.shrink(w);break}let g=C(p,"time",0),b=C(p,"mix",1),y=C(p,"softness",0)*i,v=n.curve;v&&(w=_(v,d,w,x,0,f,g,m,b,1),w=_(v,d,w,x,1,f,g,u,y,i)),f=g,m=b,u=y,n=p}r.push(d)}if(e.transform)for(let o in e.transform){let a=e.transform[o],n=a[0];if(!n)continue;let l=s.findTransformConstraint(o);if(!l)throw new Error("Transform constraint not found: "+o);let c=s.transformConstraints.indexOf(l),d=new ct(a.length,a.length*6,c),f=C(n,"time",0),m=C(n,"mixRotate",1),u=C(n,"mixX",1),x=C(n,"mixY",u),w=C(n,"mixScaleX",1),p=C(n,"mixScaleY",w),g=C(n,"mixShearY",1);for(let b=0,y=0;;b++){d.setFrame(b,f,m,u,x,w,p,g);let v=a[b+1];if(!v){d.shrink(y);break}let A=C(v,"time",0),S=C(v,"mixRotate",1),I=C(v,"mixX",1),T=C(v,"mixY",I),M=C(v,"mixScaleX",1),Y=C(v,"mixScaleY",M),F=C(v,"mixShearY",1),E=n.curve;E&&(y=_(E,d,y,b,0,f,A,m,S,1),y=_(E,d,y,b,1,f,A,u,I,1),y=_(E,d,y,b,2,f,A,x,T,1),y=_(E,d,y,b,3,f,A,w,M,1),y=_(E,d,y,b,4,f,A,p,Y,1),y=_(E,d,y,b,5,f,A,g,F,1)),f=A,m=S,u=I,x=T,w=M,p=Y,g=F,n=v}r.push(d)}if(e.path)for(let o in e.path){let a=e.path[o],n=s.findPathConstraint(o);if(!n)throw new Error("Path constraint not found: "+o);let l=s.pathConstraints.indexOf(n);for(let c in a){let d=a[c],f=d[0];if(!f)continue;let m=d.length;if(c==="position"){let u=new dt(m,m,l);r.push(ne(d,u,0,n.positionMode==0?i:1))}else if(c==="spacing"){let u=new ft(m,m,l);r.push(ne(d,u,0,n.spacingMode==0||n.spacingMode==1?i:1))}else if(c==="mix"){let u=new ut(m,m*3,l),x=C(f,"time",0),w=C(f,"mixRotate",1),p=C(f,"mixX",1),g=C(f,"mixY",p);for(let b=0,y=0;;b++){u.setFrame(b,x,w,p,g);let v=d[b+1];if(!v){u.shrink(y);break}let A=C(v,"time",0),S=C(v,"mixRotate",1),I=C(v,"mixX",1),T=C(v,"mixY",I),M=f.curve;M&&(y=_(M,u,y,b,0,x,A,w,S,1),y=_(M,u,y,b,1,x,A,p,I,1),y=_(M,u,y,b,2,x,A,g,T,1)),x=A,w=S,p=I,g=T,f=v}r.push(u)}}}if(e.physics)for(let o in e.physics){let a=e.physics[o],n=-1;if(o.length>0){let l=s.findPhysicsConstraint(o);if(!l)throw new Error("Physics constraint not found: "+o);n=s.physicsConstraints.indexOf(l)}for(let l in a){let c=a[l],d=c[0];if(!d)continue;let f=c.length;if(l=="reset"){const u=new vt(f,n);for(let x=0;d!=null;d=c[x+1],x++)u.setFrame(x,C(d,"time",0));r.push(u);continue}let m;if(l=="inertia")m=new mt(f,f,n);else if(l=="strength")m=new gt(f,f,n);else if(l=="damping")m=new xt(f,f,n);else if(l=="mass")m=new bt(f,f,n);else if(l=="wind")m=new wt(f,f,n);else if(l=="gravity")m=new pt(f,f,n);else if(l=="mix")m=new yt(f,f,n);else continue;r.push(ne(c,m,0,1))}}if(e.attachments)for(let o in e.attachments){let a=e.attachments[o],n=s.findSkin(o);if(!n)throw new Error("Skin not found: "+o);for(let l in a){let c=a[l],d=s.findSlot(l);if(!d)throw new Error("Slot not found: "+l);let f=d.index;for(let m in c){let u=c[m],x=n.getAttachment(f,m);for(let w in u){let p=u[w],g=p[0];if(g){if(w=="deform"){let b=x.bones,y=x.vertices,v=b?y.length/3*2:y.length,A=new ot(p.length,p.length,f,x),S=C(g,"time",0);for(let I=0,T=0;;I++){let M,Y=C(g,"vertices",null);if(!Y)M=b?P.newFloatArray(v):y;else{M=P.newFloatArray(v);let X=C(g,"offset",0);if(P.arrayCopy(Y,0,M,X,Y.length),i!=1)for(let B=X,N=B+Y.length;B<N;B++)M[B]*=i;if(!b)for(let B=0;B<v;B++)M[B]+=y[B]}A.setFrame(I,S,M);let F=p[I+1];if(!F){A.shrink(T);break}let E=C(F,"time",0),k=g.curve;k&&(T=_(k,A,T,I,0,S,E,0,1,1)),S=E,g=F}r.push(A)}else if(w=="sequence"){let b=new At(p.length,f,x),y=0;for(let v=0;v<p.length;v++){let A=C(g,"delay",y),S=C(g,"time",0),I=rs[C(g,"mode","hold")],T=C(g,"index",0);b.setFrame(v,S,I,T,A),y=A,g=p[v+1]}r.push(b)}}}}}}if(e.drawOrder){let o=new we(e.drawOrder.length),a=s.slots.length,n=0;for(let l=0;l<e.drawOrder.length;l++,n++){let c=e.drawOrder[l],d=null,f=C(c,"offsets",null);if(f){d=P.newArray(a,-1);let m=P.newArray(a-f.length,0),u=0,x=0;for(let w=0;w<f.length;w++){let p=f[w],g=s.findSlot(p.slot);if(!g)throw new Error("Slot not found: "+g);let b=g.index;for(;u!=b;)m[x++]=u++;d[u+p.offset]=u++}for(;u<a;)m[x++]=u++;for(let w=a-1;w>=0;w--)d[w]==-1&&(d[w]=m[--x])}o.setFrame(n,C(c,"time",0),d)}r.push(o)}if(e.events){let o=new Re(e.events.length),a=0;for(let n=0;n<e.events.length;n++,a++){let l=e.events[n],c=s.findEvent(l.name);if(!c)throw new Error("Event not found: "+l.name);let d=new Pt(P.toSinglePrecision(C(l,"time",0)),c);d.intValue=C(l,"int",c.intValue),d.floatValue=C(l,"float",c.floatValue),d.stringValue=C(l,"string",c.stringValue),d.data.audioPath&&(d.volume=C(l,"volume",1),d.balance=C(l,"balance",0)),o.setFrame(a,d)}r.push(o)}let h=0;for(let o=0,a=r.length;o<a;o++)h=Math.max(h,r[o].getDuration());s.animations.push(new Fe(t,r,h))}},Ei=class{parent;skin;slotIndex;mesh;inheritTimeline;constructor(e,t,s,i,r){this.mesh=e,this.skin=t,this.slotIndex=s,this.parent=i,this.inheritTimeline=r}};function ne(e,t,s,i){let r=e[0],h=C(r,"time",0),o=C(r,"value",s)*i,a=0;for(let n=0;;n++){t.setFrame(n,h,o);let l=e[n+1];if(!l)return t.shrink(a),t;let c=C(l,"time",0),d=C(l,"value",s)*i;r.curve&&(a=_(r.curve,t,a,n,0,h,c,o,d,i)),h=c,o=d,r=l}}function $t(e,t,s,i,r,h){let o=e[0],a=C(o,"time",0),n=C(o,s,r)*h,l=C(o,i,r)*h,c=0;for(let d=0;;d++){t.setFrame(d,a,n,l);let f=e[d+1];if(!f)return t.shrink(c),t;let m=C(f,"time",0),u=C(f,s,r)*h,x=C(f,i,r)*h,w=o.curve;w&&(c=_(w,t,c,d,0,a,m,n,u,h),c=_(w,t,c,d,1,a,m,l,x,h)),a=m,n=u,l=x,o=f}}function _(e,t,s,i,r,h,o,a,n,l){if(e=="stepped")return t.setStepped(i),s;let c=r<<2,d=e[c],f=e[c+1]*l,m=e[c+2],u=e[c+3]*l;return t.setBezier(s,i,r,h,a,d,f,m,u,o,n),s+1}function C(e,t,s){return e[t]!==void 0?e[t]:s}typeof Math.fround>"u"&&(Math.fround=function(e){return function(t){return e[0]=t,e[0]}}(new Float32Array(1)));var Ys=class extends Yt{constructor(e){super(e)}setFilters(e,t){}setWraps(e,t){}dispose(){}},Ri=class extends bs{constructor(e="",t=new Rt){super(s=>new Ys(s),e,t)}},Pi=P.newFloatArray(8),Bi=class We{static QUAD_TRIANGLES=[0,1,2,2,3,0];static VERTEX_SIZE=8;ctx;triangleRendering=!1;debugRendering=!1;vertices=P.newFloatArray(8*1024);tempColor=new D;constructor(t){this.ctx=t}draw(t){this.triangleRendering?this.drawTriangles(t):this.drawImages(t)}drawImages(t){let s=this.ctx,i=this.tempColor,r=t.color,h=t.drawOrder;this.debugRendering&&(s.strokeStyle="green");for(let o=0,a=h.length;o<a;o++){let n=h[o],l=n.bone;if(!l.active)continue;let c=n.getAttachment();if(!(c instanceof H))continue;c.computeWorldVertices(n,Pi,0,2);let d=c.region,f=d.texture.getImage(),m=n.color,u=c.color;i.set(r.r*m.r*u.r,r.g*m.g*u.g,r.b*m.b*u.b,r.a*m.a*u.a),s.save(),s.transform(l.a,l.c,l.b,l.d,l.worldX,l.worldY),s.translate(c.offset[0],c.offset[1]),s.rotate(c.rotation*Math.PI/180);let x=c.width/d.originalWidth;s.scale(x*c.scaleX,x*c.scaleY);let w=d.width,p=d.height;if(s.translate(w/2,p/2),c.region.degrees==90){let g=w;w=p,p=g,s.rotate(-Math.PI/2)}s.scale(1,-1),s.translate(-w/2,-p/2),s.globalAlpha=i.a,s.drawImage(f,f.width*d.u,f.height*d.v,w,p,0,0,w,p),this.debugRendering&&s.strokeRect(0,0,w,p),s.restore()}}drawTriangles(t){let s=this.ctx,i=this.tempColor,r=t.color,h=t.drawOrder,o=null,a=this.vertices,n=null;for(let c=0,d=h.length;c<d;c++){let f=h[c],m=f.getAttachment(),u,x;if(m instanceof H){let w=m;a=this.computeRegionVertices(f,w,!1),n=We.QUAD_TRIANGLES,u=w.region.texture.getImage()}else if(m instanceof Ce){let w=m;a=this.computeMeshVertices(f,w,!1),n=w.triangles,u=w.region.texture.getImage()}else continue;if(u){f.data.blendMode!=o&&(o=f.data.blendMode);let w=f.color,p=m.color;i.set(r.r*w.r*p.r,r.g*w.g*p.g,r.b*w.b*p.b,r.a*w.a*p.a),s.globalAlpha=i.a;for(var l=0;l<n.length;l+=3){let g=n[l]*8,b=n[l+1]*8,y=n[l+2]*8,v=a[g],A=a[g+1],S=a[g+6],I=a[g+7],T=a[b],M=a[b+1],Y=a[b+6],F=a[b+7],E=a[y],k=a[y+1],X=a[y+6],B=a[y+7];this.drawTriangle(u,v,A,S,I,T,M,Y,F,E,k,X,B),this.debugRendering&&(s.strokeStyle="green",s.beginPath(),s.moveTo(v,A),s.lineTo(T,M),s.lineTo(E,k),s.lineTo(v,A),s.stroke())}}}this.ctx.globalAlpha=1}drawTriangle(t,s,i,r,h,o,a,n,l,c,d,f,m){let u=this.ctx;const x=t.width-1,w=t.height-1;r*=x,h*=w,n*=x,l*=w,f*=x,m*=w,u.beginPath(),u.moveTo(s,i),u.lineTo(o,a),u.lineTo(c,d),u.closePath(),o-=s,a-=i,c-=s,d-=i,n-=r,l-=h,f-=r,m-=h;let p=n*m-f*l;if(p==0)return;p=1/p;const g=(m*o-l*c)*p,b=(m*a-l*d)*p,y=(n*c-f*o)*p,v=(n*d-f*a)*p,A=s-g*r-y*h,S=i-b*r-v*h;u.save(),u.transform(g,b,y,v,A,S),u.clip(),u.drawImage(t,0,0),u.restore()}computeRegionVertices(t,s,i){let r=t.bone.skeleton.color,h=t.color,o=s.color,a=r.a*h.a*o.a,n=i?a:1,l=this.tempColor;l.set(r.r*h.r*o.r*n,r.g*h.g*o.g*n,r.b*h.b*o.b*n,a),s.computeWorldVertices(t,this.vertices,0,We.VERTEX_SIZE);let c=this.vertices,d=s.uvs;return c[H.C1R]=l.r,c[H.C1G]=l.g,c[H.C1B]=l.b,c[H.C1A]=l.a,c[H.U1]=d[0],c[H.V1]=d[1],c[H.C2R]=l.r,c[H.C2G]=l.g,c[H.C2B]=l.b,c[H.C2A]=l.a,c[H.U2]=d[2],c[H.V2]=d[3],c[H.C3R]=l.r,c[H.C3G]=l.g,c[H.C3B]=l.b,c[H.C3A]=l.a,c[H.U3]=d[4],c[H.V3]=d[5],c[H.C4R]=l.r,c[H.C4G]=l.g,c[H.C4B]=l.b,c[H.C4A]=l.a,c[H.U4]=d[6],c[H.V4]=d[7],c}computeMeshVertices(t,s,i){let r=t.bone.skeleton.color,h=t.color,o=s.color,a=r.a*h.a*o.a,n=i?a:1,l=this.tempColor;l.set(r.r*h.r*o.r*n,r.g*h.g*o.g*n,r.b*h.b*o.b*n,a);let c=s.worldVerticesLength/2,d=this.vertices;d.length<s.worldVerticesLength&&(this.vertices=d=P.newFloatArray(s.worldVerticesLength)),s.computeWorldVertices(t,0,s.worldVerticesLength,d,0,We.VERTEX_SIZE);let f=s.uvs;for(let m=0,u=0,x=2;m<c;m++)d[x++]=l.r,d[x++]=l.g,d[x++]=l.b,d[x++]=l.a,d[x++]=f[u++],d[x++]=f[u++],x+=2;return d}};
return { "AlphaTimeline": at, "Animation": Fe, "AnimationState": Us, "AnimationStateAdapter": zs, "AnimationStateData": _s, "AssetCache": ws, "AssetManager": Ri, "AssetManagerBase": bs, "AtlasAttachmentLoader": Hs, "Attachment": Ge, "AttachmentTimeline": me, "BinaryInput": ks, "BlendMode": zt, "Bone": Et, "BoneData": Ft, "BoundingBoxAttachment": kt, "CURRENT": fs, "CanvasTexture": Ys, "ClippingAttachment": Tt, "Color": D, "ConstraintData": ke, "CurveTimeline": ae, "CurveTimeline1": ie, "CurveTimeline2": Ee, "DebugUtils": Ds, "DeformTimeline": ot, "Downloader": Rt, "DrawOrderTimeline": we, "Event": Pt, "EventData": Bt, "EventQueue": hs, "EventTimeline": Re, "EventType": cs, "FIRST": St, "FakeTexture": Gs, "HOLD_FIRST": Be, "HOLD_MIX": ds, "HOLD_SUBSEQUENT": Ct, "IkConstraint": ps, "IkConstraintData": Vt, "IkConstraintTimeline": ht, "Inherit": Le, "InheritTimeline": st, "IntSet": Ns, "Interpolation": ts, "MathUtils": R, "MeshAttachment": Ce, "MixBlend": ns, "MixDirection": ls, "PathAttachment": Ie, "PathConstraint": ys, "PathConstraintData": Lt, "PathConstraintMixTimeline": ut, "PathConstraintPositionTimeline": dt, "PathConstraintSpacingTimeline": ft, "Physics": Cs, "PhysicsConstraintDampingTimeline": xt, "PhysicsConstraintGravityTimeline": pt, "PhysicsConstraintInertiaTimeline": mt, "PhysicsConstraintMassTimeline": bt, "PhysicsConstraintMixTimeline": yt, "PhysicsConstraintResetTimeline": vt, "PhysicsConstraintStrengthTimeline": gt, "PhysicsConstraintTimeline": de, "PhysicsConstraintWindTimeline": wt, "PointAttachment": xs, "Pool": Ae, "PositionMode": Nt, "Pow": ss, "PowOut": Os, "RGB2Timeline": lt, "RGBA2Timeline": nt, "RGBATimeline": it, "RGBTimeline": rt, "RegionAttachment": H, "RotateMode": Dt, "RotateTimeline": Se, "SETUP": It, "SUBSEQUENT": Pe, "ScaleTimeline": je, "ScaleXTimeline": Ke, "ScaleYTimeline": Qe, "SequenceTimeline": At, "ShearTimeline": Ze, "ShearXTimeline": et, "ShearYTimeline": tt, "Skeleton": Ss, "SkeletonBinary": js, "SkeletonBounds": Mi, "SkeletonClipping": Xi, "SkeletonData": qt, "SkeletonJson": Fi, "SkeletonRenderer": Bi, "Skin": Ne, "SkinEntry": Wt, "Slot": vs, "SlotData": Ut, "SpacingMode": Ot, "StringSet": _e, "Texture": Yt, "TextureAtlas": Mt, "TextureAtlasPage": gs, "TextureAtlasRegion": Xt, "TextureFilter": Ve, "TextureRegion": ms, "TextureWrap": us, "TimeKeeper": qs, "Timeline": J, "TrackEntry": os, "TransformConstraint": As, "TransformConstraintData": _t, "TransformConstraintTimeline": ct, "TranslateTimeline": $e, "TranslateXTimeline": He, "TranslateYTimeline": Je, "Triangulator": Ts, "Utils": P, "Vector2": Xe, "VertexAttachment": oe, "WindowedMean": Ws };
})()

    const ASSET_ROOT = 'zzz-spine/assets/'
    const STAGE_WIDTH = 180
    const STAGE_HEIGHT = 240
    const GROUND_MARGIN = 4
    /**
     * The event card's lead figure. 德蕾琪娜·挽昼 is the character; 柔光之影 is
     * only the name of the outfit the event shows her in.
     */
    const CHARACTER = { dir: 'levels_spine_a', name: '德蕾琪娜·挽昼' }
    /**
     * Presentation cadence for the figure. The idle loop's meshes move about
     * 0.16 device pixels per 1/60 s, so a 60 Hz repaint draws 59 near-identical
     * frames a second for ~13 ms of Canvas2D time each — the whole frame budget
     * of the page. At 20 Hz one step is 0.24 CSS px, still sub-pixel motion for
     * an eye that only sees the 3.3 s loop, for a third of the work.
     */
    const FRAME_INTERVAL = 1000 / 20

    /**
     * Canvas2D cannot fill a skinned mesh in one call: it clips every triangle
     * and blits the atlas page through an affine map. Those clips are
     * antialiased, so at every shared edge the two neighbours each cover only
     * part of the pixel — the edge comes out at ~75% alpha instead of 100%.
     * Over the dark card that deficit reads as a wireframe of hairlines across
     * the whole figure, and a phone whose DPR is higher than the backing store
     * cap upsamples the canvas, thickening them into thread-like lines.
     *
     * Growing each triangle's clip by this many device pixels lets the
     * neighbours overlap so the shared edge reaches full alpha. Each triangle
     * blits only its own atlas rect, so the grown border can only repeat the
     * sprite's own pixels and never samples the sprite packed next to it.
     */
    const SEAM_OVERLAP = 0.6

    /**
     * The corner stage is mostly empty, so the pointer router tests the
     * figure's painted pixels instead of letting the whole rectangle swallow
     * presses. The mask is a coarse 45×60 alpha grid — 4×4 CSS px per cell —
     * rebuilt from the canvas every eighth painted frame (400 ms at 20 Hz).
     */
    const MASK_WIDTH = 45
    const MASK_HEIGHT = 60
    const MASK_THRESHOLD = 64
    const MASK_FRAMES = 8
    /**
     * A press on the figure is followed by a click the router has to swallow;
     * this window is also held after fading so the second click of a double
     * click cannot land on whatever the figure was covering.
     */
    const THROUGH_GUARD_MS = 400

    /**
     * The lock is a preference, not a page-local mode: it lives in
     * localStorage, so a new session page, a reload, or a second tab opens
     * with the figure already ghosted instead of needing the lock again.
     * Sessions are pages of the same origin, so the browser is the right
     * scope; clearing site data brings back the default unlocked figure.
     */
    const LOCK_STORAGE_KEY = 'zzz-spine:locked'

    function readStoredLock() {
      try {
        return window.localStorage.getItem(LOCK_STORAGE_KEY) === '1'
      } catch {
        // Storage can be unavailable (site data blocked, some private modes).
        // Losing the preference is harmless: the figure starts unlocked.
        return false
      }
    }

    function writeStoredLock(locked) {
      try {
        if (locked) window.localStorage.setItem(LOCK_STORAGE_KEY, '1')
        else window.localStorage.removeItem(LOCK_STORAGE_KEY)
      } catch {
        // Not remembered, but this page keeps the lock until it is reloaded.
      }
    }

    const dataCache = new Map()

    function fetchText(url) {
      // No `force-cache`: the host answers with an ETag and a 304, so a rebuilt
      // atlas is picked up without re-downloading unchanged bytes.
      return fetch(url).then((response) => {
        if (!response.ok) throw new Error(`assets ${response.status}: ${url}`)
        return response.text()
      })
    }

    function fetchJson(url) {
      return fetchText(url).then((text) => JSON.parse(text))
    }

    /**
     * Decode a texture page without blocking a frame. `Image` finishes decoding
     * on the first `drawImage`, i.e. inside a paint; `createImageBitmap` decodes
     * up front off the main thread, which is why the first frame no longer costs
     * the ~33 ms an <img> decode did.
     */
    async function loadTexture(url) {
      if (typeof createImageBitmap === 'function') {
        try {
          const response = await fetch(url)
          if (!response.ok) throw new Error(`texture ${response.status}: ${url}`)
          return await createImageBitmap(await response.blob())
        } catch {
          // Fall through to the element path; both are accepted by CanvasTexture.
        }
      }
      return await new Promise((resolve, reject) => {
        const image = new Image()
        image.decoding = 'async'
        image.onload = () => resolve(image)
        image.onerror = () => reject(new Error(`texture failed: ${url}`))
        image.src = url
      })
    }

    /** World-space bounds of the visible attachments at three idle poses. */
    function measure(skeletonData, animationName) {
      const skeleton = new spine.Skeleton(skeletonData)
      const state = new spine.AnimationState(new spine.AnimationStateData(skeletonData))
      state.setAnimation(0, animationName, true)
      const vertices = []
      let minX = Infinity
      let minY = Infinity
      let maxX = -Infinity
      let maxY = -Infinity
      const samples = [0, 0.45, 0.9, 1.35]
      for (let index = 0; index < samples.length; index++) {
        const step = index === 0 ? 0 : 0.45
        state.update(step)
        state.apply(skeleton)
        skeleton.updateWorldTransform(spine.Physics.update)
        for (const slot of skeleton.drawOrder) {
          const attachment = slot.getAttachment()
          if (!attachment) continue
          const isRegion = attachment instanceof spine.RegionAttachment
          const isMesh = attachment instanceof spine.MeshAttachment
          if (!isRegion && !isMesh) continue
          const length = attachment.worldVerticesLength
          if (!length) continue
          if (vertices.length < length) vertices.length = length
          attachment.computeWorldVertices(slot, 0, length, vertices, 0, 2)
          for (let i = 0; i < length; i += 2) {
            if (vertices[i] < minX) minX = vertices[i]
            if (vertices[i] > maxX) maxX = vertices[i]
            if (vertices[i + 1] < minY) minY = vertices[i + 1]
            if (vertices[i + 1] > maxY) maxY = vertices[i + 1]
          }
        }
      }
      if (!Number.isFinite(minX) || !Number.isFinite(minY)) return null
      return { minX, minY, maxX, maxY }
    }

    /** The editor's setup bounds, when the skeleton declares usable ones. */
    function declaredBox(skeletonData) {
      const width = skeletonData.width
      const height = skeletonData.height
      if (!(width > 1) || !(height > 1)) return null
      return {
        minX: skeletonData.x,
        minY: skeletonData.y,
        maxX: skeletonData.x + width,
        maxY: skeletonData.y + height,
      }
    }

    /** Canvas transform that fits the given box on the stage, bottom-aligned. */
    function framing(bounds) {
      if (bounds === null) return null
      const width = Math.max(1, bounds.maxX - bounds.minX)
      const height = Math.max(1, bounds.maxY - bounds.minY)
      const usableWidth = STAGE_WIDTH - 6
      const usableHeight = STAGE_HEIGHT - GROUND_MARGIN * 2
      const scale = Math.min(usableWidth / width, usableHeight / height)
      const drawnWidth = width * scale
      const left = (STAGE_WIDTH - drawnWidth) / 2
      // World y grows upward and canvas y downward; the figures stand on the
      // card's top edge, so the lowest declared pixel sits at the bottom.
      return {
        a: scale,
        e: left - bounds.minX * scale,
        f: STAGE_HEIGHT - GROUND_MARGIN + bounds.minY * scale,
      }
    }

    /** Skin with the most resolved attachments is the one that draws body art. */
    function pickSkin(skeleton, skeletonData) {
      let best = null
      let bestCount = -1
      for (const skin of skeletonData.skins) {
        skeleton.setSkinByName(skin.name)
        skeleton.setToSetupPose()
        let count = 0
        for (const slot of skeleton.slots) if (slot.attachment) count++
        if (count > bestCount) {
          bestCount = count
          best = skin.name
        }
      }
      return best
    }

    const QUAD_TRIANGLES = [0, 1, 2, 2, 3, 0]

    /**
     * Paint one pose of a skinned skeleton.
     *
     * This replaces `spine.SkeletonRenderer`'s `triangleRendering` path: the
     * drawing is the same run of clipped, affine-mapped atlas blits, but each
     * clip is grown by `overlap` world units and sourced from the attachment's
     * own atlas rect. Shared edges then overlap instead of leaving the
     * translucent hairline described at `SEAM_OVERLAP`, and the grown border
     * can only repeat the sprite's own pixels.
     *
     * `overlap` is `SEAM_OVERLAP` converted to world units, so the overlap is a
     * constant size in device pixels at any backing-store scale.
     */
    function drawSkeleton(context, skeleton, overlap) {
      let vertices = new Float32Array(0)
      for (const slot of skeleton.drawOrder) {
        const attachment = slot.getAttachment()
        if (attachment === null) continue
        const isRegion = attachment instanceof spine.RegionAttachment
        const isMesh = !isRegion && attachment instanceof spine.MeshAttachment
        if (!isRegion && !isMesh) continue
        const region = attachment.region
        if (region === null || region === undefined) continue
        if (region.texture === null || region.texture === undefined) continue
        const image = region.texture.getImage()
        if (image === null || image === undefined) continue
        const length = isRegion ? 8 : attachment.worldVerticesLength
        if (!(length > 0)) continue
        if (vertices.length < length) vertices = new Float32Array(length)
        if (isRegion) attachment.computeWorldVertices(slot, vertices, 0, 2)
        else attachment.computeWorldVertices(slot, 0, length, vertices, 0, 2)
        const triangles = isRegion ? QUAD_TRIANGLES : attachment.triangles
        if (triangles === null || triangles === undefined) continue
        const uvs = attachment.uvs
        if (uvs === null || uvs === undefined) continue
        const attachmentColor = attachment.color
        const alpha = skeleton.color.a * slot.color.a *
          (attachmentColor === undefined ? 1 : attachmentColor.a)
        if (!(alpha > 0)) continue
        // The atlas stores a `rotate: 90` region transposed: the atlas text's
        // width/height describe the sprite, while the page holds height×width.
        const rotated = region.degrees === 90
        const sourceWidth = rotated ? region.height : region.width
        const sourceHeight = rotated ? region.width : region.height
        const pageWidth = image.width - 1
        const pageHeight = image.height - 1
        context.globalAlpha = alpha
        for (let index = 0; index < triangles.length; index += 3) {
          const a = triangles[index] * 2
          const b = triangles[index + 1] * 2
          const c = triangles[index + 2] * 2
          const x1 = vertices[a]
          const y1 = vertices[a + 1]
          const x2 = vertices[b]
          const y2 = vertices[b + 1]
          const x3 = vertices[c]
          const y3 = vertices[c + 1]
          // Grow the clip away from the centroid: every edge moves outward by
          // `overlap`, so neighbours overlap instead of meeting at half alpha.
          const centerX = (x1 + x2 + x3) / 3
          const centerY = (y1 + y2 + y3) / 3
          let reach = Math.hypot(x1 - centerX, y1 - centerY) || 1
          const p1x = x1 + ((x1 - centerX) / reach) * overlap
          const p1y = y1 + ((y1 - centerY) / reach) * overlap
          reach = Math.hypot(x2 - centerX, y2 - centerY) || 1
          const p2x = x2 + ((x2 - centerX) / reach) * overlap
          const p2y = y2 + ((y2 - centerY) / reach) * overlap
          reach = Math.hypot(x3 - centerX, y3 - centerY) || 1
          const p3x = x3 + ((x3 - centerX) / reach) * overlap
          const p3y = y3 + ((y3 - centerY) / reach) * overlap
          const tu1 = uvs[a] * pageWidth
          const tv1 = uvs[a + 1] * pageHeight
          const tu2 = uvs[b] * pageWidth
          const tv2 = uvs[b + 1] * pageHeight
          const tu3 = uvs[c] * pageWidth
          const tv3 = uvs[c + 1] * pageHeight
          context.beginPath()
          context.moveTo(p1x, p1y)
          context.lineTo(p2x, p2y)
          context.lineTo(p3x, p3y)
          context.closePath()
          // Affine map from the atlas page onto this triangle. Paths are
          // rasterised where they are built, so the clip above keeps its
          // canvas-space shape while the blit is transformed.
          const e1x = p2x - p1x
          const e1y = p2y - p1y
          const e2x = p3x - p1x
          const e2y = p3y - p1y
          const du2 = tu2 - tu1
          const dv2 = tv2 - tv1
          const du3 = tu3 - tu1
          const dv3 = tv3 - tv1
          let det = du2 * dv3 - du3 * dv2
          if (det === 0) continue
          det = 1 / det
          const ta = (dv3 * e1x - dv2 * e2x) * det
          const tb = (dv3 * e1y - dv2 * e2y) * det
          const tc = (du2 * e2x - du3 * e1x) * det
          const td = (du2 * e2y - du3 * e1y) * det
          context.save()
          context.transform(ta, tb, tc, td,
            p1x - ta * tu1 - tc * tv1, p1y - tb * tu1 - td * tv1)
          context.clip()
          context.drawImage(image,
            region.x, region.y, sourceWidth, sourceHeight,
            region.x, region.y, sourceWidth, sourceHeight)
          context.restore()
        }
      }
      context.globalAlpha = 1
    }
    /* ---------------------------------------------------------------------
     * WebGL figure
     *
     * Canvas2D has exactly one way to fill a textured triangle: clip to it and
     * blit the atlas through an affine map. Clip edges are antialiased, so every
     * shared edge comes out translucent; growing the clip (`SEAM_OVERLAP`) hides
     * most of that, but the seam is only ever covered, never removed, and how
     * much survives depends on the browser's clip rasteriser. That is why Spine
     * calls its canvas mesh path experimental and points at the WebGL backend.
     *
     * On the GPU the same triangles are filled by one rasteriser with one fill
     * rule: a pixel inside the mesh is covered exactly once, so shared edges
     * cannot seam. This is a small purpose-built renderer rather than the full
     * spine-webgl runtime: the canvas runtime already poses the skeleton, so all
     * that is left is one batched draw call.
     *
     * Atlas bleeding is handled in the shader. Spine's UVs sit on texel edges,
     * so LINEAR sampling at a sprite's border would reach into the sprite packed
     * next to it — this page has no padding at all. Clamping each sample to the
     * attachment's own rect, half a texel in, keeps every sample inside the
     * sprite.
     * ------------------------------------------------------------------- */

    const WEBGL_VERTEX_SHADER = [
      'attribute vec2 aPosition;',
      'attribute vec2 aUV;',
      'attribute vec4 aBounds;',
      'attribute float aAlpha;',
      'uniform vec2 uScale;',
      'uniform vec2 uOffset;',
      'uniform vec2 uHalf;',
      'varying vec2 vUV;',
      'varying vec4 vBounds;',
      'varying float vAlpha;',
      'void main() {',
      '  vec2 px = aPosition * uScale + uOffset;',
      '  gl_Position = vec4(px.x / uHalf.x - 1.0, 1.0 - px.y / uHalf.y, 0.0, 1.0);',
      '  vUV = aUV;',
      '  vBounds = aBounds;',
      '  vAlpha = aAlpha;',
      '}',
    ].join('\n')

    const WEBGL_FRAGMENT_SHADER = [
      '#ifdef GL_FRAGMENT_PRECISION_HIGH',
      'precision highp float;',
      '#else',
      'precision mediump float;',
      '#endif',
      'uniform sampler2D uTexture;',
      'varying vec2 vUV;',
      'varying vec4 vBounds;',
      'varying float vAlpha;',
      'void main() {',
      '  // The atlas is uploaded premultiplied (see UNPACK_PREMULTIPLY_ALPHA_WEBGL),',
      '  // so the texel already carries rgb*alpha. Multiplying again would be wrong;',
      '  // and uploading straight alpha makes LINEAR sampling pull transparent-black',
      '  // padding into every sprite edge (the dark fringe around all textures).',
      '  vec4 texel = texture2D(uTexture, clamp(vUV, vBounds.xy, vBounds.zw));',
      '  gl_FragColor = texel * vAlpha;',
      '}',
    ].join('\n')

    function compileShader(gl, type, source) {
      const shader = gl.createShader(type)
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw new Error('shader: ' + gl.getShaderInfoLog(shader))
      }
      return shader
    }

    /** Every attachment name this slot can show while the track plays. */
    function slotAttachmentNames(skin, slotIndex) {
      if (skin === null || skin === undefined) return []
      const bag = skin.attachments
      if (bag === null || bag === undefined) return []
      const entry = typeof bag.get === 'function' ? bag.get(slotIndex) : bag[slotIndex]
      if (entry === null || entry === undefined) return []
      if (typeof entry.keys === 'function') return [...entry.keys()]
      return Object.keys(entry)
    }

    /**
     * One batched draw call for the whole figure, plus a tiny framebuffer used
     * to rebuild the click-through mask without reading the visible canvas
     * (a WebGL canvas cannot be read back with `getImageData`).
     */
    function createWebGlFigure(canvas, image, fit) {
      const gl = canvas.getContext('webgl', {
        alpha: true,
        premultipliedAlpha: true,
        antialias: false,
        depth: false,
        stencil: false,
        preserveDrawingBuffer: false,
      })
      if (gl === null) throw new Error('no webgl context')

      const pageWidth = image.width
      const pageHeight = image.height
      let program = null
      let attributes = null
      let uniforms = null
      let texture = null
      let buffers = null
      let layout = null
      let mask = null
      let restored = null
      let lost = false
      let skeletonRef = null
      let skinRef = null
      let pixelRatioRef = 1
      const scratch = { vertices: new Float32Array(0) }

      const createResources = () => {
        program = gl.createProgram()
        gl.attachShader(program, compileShader(gl, gl.VERTEX_SHADER, WEBGL_VERTEX_SHADER))
        gl.attachShader(program, compileShader(gl, gl.FRAGMENT_SHADER, WEBGL_FRAGMENT_SHADER))
        gl.linkProgram(program)
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
          throw new Error('program: ' + gl.getProgramInfoLog(program))
        }
        attributes = {
          position: gl.getAttribLocation(program, 'aPosition'),
          uv: gl.getAttribLocation(program, 'aUV'),
          bounds: gl.getAttribLocation(program, 'aBounds'),
          alpha: gl.getAttribLocation(program, 'aAlpha'),
        }
        uniforms = {
          scale: gl.getUniformLocation(program, 'uScale'),
          offset: gl.getUniformLocation(program, 'uOffset'),
          half: gl.getUniformLocation(program, 'uHalf'),
          texture: gl.getUniformLocation(program, 'uTexture'),
        }
        texture = gl.createTexture()
        gl.bindTexture(gl.TEXTURE_2D, texture)
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        mask = null
        if (skeletonRef !== null) buildBuffers(skeletonRef, skinRef)
      }

      /**
       * One block of vertices per (slot, candidate attachment), in slot order.
       * A slot can switch attachments while the track plays (the idle track
       * toggles the eye expressions 42 times), so every candidate the skin
       * offers for that slot is reserved; each frame the inactive ones are
       * collapsed to zero area and drawn as nothing.
       */
      const buildBuffers = (skeleton, skin) => {
        const slots = skeleton.slots
        const entries = []
        let vertexTotal = 0
        let indexTotal = 0
        for (let slotIndex = 0; slotIndex < slots.length; slotIndex++) {
          const slotData = slots[slotIndex]
          const candidates = slotAttachmentNames(skin, slotIndex)
          if (slotData.attachment !== undefined && slotData.attachment !== null &&
            candidates.indexOf(slotData.attachment) < 0) {
            candidates.push(slotData.attachment)
          }
          for (const name of candidates) {
            const attachment = skin.getAttachment(slotIndex, name)
            if (attachment === null || attachment === undefined) continue
            const isRegion = attachment instanceof spine.RegionAttachment
            const isMesh = !isRegion && attachment instanceof spine.MeshAttachment
            if (!isRegion && !isMesh) continue
            const region = attachment.region
            if (region === null || region === undefined) continue
            if (region.texture === null || region.texture === undefined) continue
            const uvs = attachment.uvs
            if (uvs === null || uvs === undefined) continue
            const count = isRegion ? 4 : attachment.worldVerticesLength / 2
            if (!(count > 0)) continue
            const triangles = isRegion ? QUAD_TRIANGLES : attachment.triangles
            if (triangles === null || triangles === undefined) continue
            // Rotated atlas regions are stored transposed: the atlas text's
            // width/height describe the sprite, the page holds height×width.
            const rotated = region.degrees === 90
            const storedWidth = rotated ? region.height : region.width
            const storedHeight = rotated ? region.width : region.height
            let minU = (region.x + 0.5) / pageWidth
            let maxU = (region.x + storedWidth - 0.5) / pageWidth
            let minV = (region.y + 0.5) / pageHeight
            let maxV = (region.y + storedHeight - 0.5) / pageHeight
            if (maxU < minU) { minU = maxU = region.x / pageWidth }
            if (maxV < minV) { minV = maxV = region.y / pageHeight }
            entries.push({
              slotIndex,
              name,
              attachment,
              first: vertexTotal,
              count,
              uvs,
              minU,
              maxU,
              minV,
              maxV,
              triangles,
            })
            vertexTotal += count
            indexTotal += triangles.length
          }
        }

        const positions = new Float32Array(vertexTotal * 2)
        const uvs = new Float32Array(vertexTotal * 2)
        const bounds = new Float32Array(vertexTotal * 4)
        const alphas = new Float32Array(vertexTotal)
        const indices = new Uint16Array(indexTotal)
        let indexOffset = 0
        for (const entry of entries) {
          for (let vertex = 0; vertex < entry.count; vertex++) {
            const target = (entry.first + vertex) * 2
            uvs[target] = entry.uvs[vertex * 2]
            uvs[target + 1] = entry.uvs[vertex * 2 + 1]
            const boundTarget = (entry.first + vertex) * 4
            bounds[boundTarget] = entry.minU
            bounds[boundTarget + 1] = entry.minV
            bounds[boundTarget + 2] = entry.maxU
            bounds[boundTarget + 3] = entry.maxV
          }
          for (let index = 0; index < entry.triangles.length; index++) {
            indices[indexOffset + index] = entry.first + entry.triangles[index]
          }
          indexOffset += entry.triangles.length
        }

        const makeBuffer = (target, data, usage) => {
          const buffer = gl.createBuffer()
          gl.bindBuffer(target, buffer)
          gl.bufferData(target, data, usage)
          return buffer
        }
        buffers = {
          positions: makeBuffer(gl.ARRAY_BUFFER, positions, gl.DYNAMIC_DRAW),
          uvs: makeBuffer(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW),
          bounds: makeBuffer(gl.ARRAY_BUFFER, bounds, gl.STATIC_DRAW),
          alphas: makeBuffer(gl.ARRAY_BUFFER, alphas, gl.DYNAMIC_DRAW),
          indices: makeBuffer(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW),
        }
        layout = {
          entries,
          byKey: new Map(entries.map((entry) => [entry.slotIndex + ':' + entry.name, entry])),
          positions,
          alphas,
          indexCount: indexTotal,
        }
      }

      const ensureMask = () => {
        if (mask !== null) return mask
        const maskTexture = gl.createTexture()
        gl.bindTexture(gl.TEXTURE_2D, maskTexture)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, MASK_WIDTH, MASK_HEIGHT, 0,
          gl.RGBA, gl.UNSIGNED_BYTE, null)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        const framebuffer = gl.createFramebuffer()
        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer)
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, maskTexture, 0)
        const complete = gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE
        gl.bindFramebuffer(gl.FRAMEBUFFER, null)
        if (!complete) return null
        mask = {
          framebuffer,
          pixels: new Uint8Array(MASK_WIDTH * MASK_HEIGHT * 4),
          cells: new Uint8Array(MASK_WIDTH * MASK_HEIGHT),
        }
        return mask
      }

      const draw = (target, pixelRatio, ratioX, ratioY, halfWidth, halfHeight) => {
        if (buffers === null || layout === null) return
        gl.bindFramebuffer(gl.FRAMEBUFFER, target)
        gl.viewport(0, 0, Math.round(halfWidth * 2), Math.round(halfHeight * 2))
        gl.clearColor(0, 0, 0, 0)
        gl.clear(gl.COLOR_BUFFER_BIT)
        gl.useProgram(program)
        gl.enable(gl.BLEND)
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_2D, texture)
        gl.uniform1i(uniforms.texture, 0)
        gl.uniform2f(uniforms.scale, fit.a * pixelRatio * ratioX, -fit.a * pixelRatio * ratioY)
        gl.uniform2f(uniforms.offset, fit.e * pixelRatio * ratioX, fit.f * pixelRatio * ratioY)
        gl.uniform2f(uniforms.half, halfWidth, halfHeight)
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.positions)
        gl.enableVertexAttribArray(attributes.position)
        gl.vertexAttribPointer(attributes.position, 2, gl.FLOAT, false, 0, 0)
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.uvs)
        gl.enableVertexAttribArray(attributes.uv)
        gl.vertexAttribPointer(attributes.uv, 2, gl.FLOAT, false, 0, 0)
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.bounds)
        gl.enableVertexAttribArray(attributes.bounds)
        gl.vertexAttribPointer(attributes.bounds, 4, gl.FLOAT, false, 0, 0)
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.alphas)
        gl.enableVertexAttribArray(attributes.alpha)
        gl.vertexAttribPointer(attributes.alpha, 1, gl.FLOAT, false, 0, 0)
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices)
        gl.drawElements(gl.TRIANGLES, layout.indexCount, gl.UNSIGNED_SHORT, 0)
        gl.bindFramebuffer(gl.FRAMEBUFFER, null)
      }

      const paint = (skeleton, pixelRatio) => {
        if (lost || buffers === null || layout === null || fit === null) return
        const positions = layout.positions
        const alphas = layout.alphas
        positions.fill(0)
        alphas.fill(0)
        for (const slot of skeleton.drawOrder) {
          const attachment = slot.getAttachment()
          if (attachment === null) continue
          const entry = layout.byKey.get(slot.data.index + ':' + attachment.name)
          if (entry === undefined) continue
          const length = entry.count * 2
          if (scratch.vertices.length < length) scratch.vertices = new Float32Array(length * 2)
          if (entry.attachment instanceof spine.RegionAttachment) {
            attachment.computeWorldVertices(slot, scratch.vertices, 0, 2)
          } else {
            attachment.computeWorldVertices(slot, 0, length, scratch.vertices, 0, 2)
          }
          positions.set(scratch.vertices.subarray(0, length), entry.first * 2)
          const alpha = skeleton.color.a * slot.color.a * attachment.color.a
          alphas.fill(alpha, entry.first, entry.first + entry.count)
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.positions)
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, positions)
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.alphas)
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, alphas)
        pixelRatioRef = pixelRatio
        draw(null, pixelRatio, 1, 1, canvas.width / 2, canvas.height / 2)
      }

      /** Rebuild the 45×60 hit mask from a matching off-screen render. */
      const readMask = (pixelRatio) => {
        if (lost || buffers === null || layout === null || fit === null) return null
        const target = ensureMask()
        if (target === null) return null
        draw(target.framebuffer, pixelRatio, MASK_WIDTH / canvas.width, MASK_HEIGHT / canvas.height,
          MASK_WIDTH / 2, MASK_HEIGHT / 2)
        // `draw` unbinds when it is done, and readPixels reads whatever framebuffer
        // is bound — so re-bind the off-screen target first.
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.framebuffer)
        gl.readPixels(0, 0, MASK_WIDTH, MASK_HEIGHT, gl.RGBA, gl.UNSIGNED_BYTE, target.pixels)
        gl.bindFramebuffer(gl.FRAMEBUFFER, null)
        let filled = 0
        for (let row = 0; row < MASK_HEIGHT; row++) {
          const source = (MASK_HEIGHT - 1 - row) * MASK_WIDTH
          const destination = row * MASK_WIDTH
          for (let column = 0; column < MASK_WIDTH; column++) {
            // readPixels starts at the bottom row; the stage's mask is top-down.
            const alpha = target.pixels[(source + column) * 4 + 3]
            const value = alpha >= MASK_THRESHOLD ? 1 : 0
            target.cells[destination + column] = value
            filled += value
          }
        }
        return { cells: target.cells, filled }
      }

      const onContextLost = (event) => {
        event.preventDefault()
        lost = true
        buffers = null
        layout = null
        mask = null
        program = null
        texture = null
      }

      const onContextRestored = () => {
        lost = false
        try {
          createResources()
        } catch {
          return
        }
        if (restored !== null) restored()
      }

      canvas.addEventListener('webglcontextlost', onContextLost)
      canvas.addEventListener('webglcontextrestored', onContextRestored)
      createResources()

      return {
        build(skeleton, skin) {
          skeletonRef = skeleton
          skinRef = skin
          buildBuffers(skeleton, skin)
        },
        paint,
        readMask,
        dispose() {
          canvas.removeEventListener('webglcontextlost', onContextLost)
          canvas.removeEventListener('webglcontextrestored', onContextRestored)
        },
        get lost() { return lost },
        set onRestore(fn) { restored = fn },
        get pixelRatio() { return pixelRatioRef },
      }
    }

    async function build(dir) {
      const dirUrl = new URL('spine/' + dir + '/', new URL(ASSET_ROOT, document.baseURI))
      const [atlasText, json] = await Promise.all([
        fetchText(new URL(dir + '.atlas', dirUrl).href),
        fetchJson(new URL(dir + '.json', dirUrl).href),
      ])
      const atlas = new spine.TextureAtlas(atlasText)
      // The atlas text already names its pages; re-parsing it would be a second,
      // more brittle copy of that truth.
      const pages = atlas.pages.map((page) => page.name)
      const textures = new Map()
      await Promise.all(pages.map(async (page) => {
        const texture = await loadTexture(new URL(page, dirUrl).href)
        textures.set(page, texture)
        for (const atlasPage of atlas.pages) {
          if (atlasPage.name === page) atlasPage.setTexture(new spine.CanvasTexture(texture))
        }
      }))
      const skeletonData = new spine.SkeletonJson(new spine.AtlasAttachmentLoader(atlas))
        .readSkeletonData(json)
      const names = skeletonData.animations.map((animation) => animation.name)
      const animation = names.includes('idle') ? 'idle' : names[0]
      return {
        skeletonData,
        animation,
        // The editor's setup bounds frame the card art the way the event page
        // shows it; the vertex union can include off-stage props, so it is only
        // the fallback for skeletons without declared bounds — and it is only
        // measured when that fallback is actually needed (7.5 ms otherwise).
        fit: framing(declaredBox(skeletonData) ?? measure(skeletonData, animation)),
        // The WebGL path uploads the atlas page itself, so it needs the decoded
        // image; a multi-page atlas is left to the Canvas2D fallback, which can
        // draw any page per attachment.
        pageCount: pages.length,
        image: pages.length === 1 ? textures.get(pages[0]) : undefined,
      }
    }

    /* ---------------------------------------------------------------------
     * Running-turn flower
     *
     * Chat's running indicator draws a whale tail sized by its own stylesheet.
     * The decoration keeps that 14px square and only swaps what is painted in
     * it for the event page's little four-petal flower. Only the spin is
     * reproduced: the event engine also wobbled the bone on x and pulsed its
     * scale, but those read as jitter at icon size and are left out.
     * ------------------------------------------------------------------- */
    /* ---------------------------------------------------------------------
     * Running-turn label
     *
     * Chat renders the running row's wording from its own locale table
     * (`chat.deepDivingFor`), and a plugin cannot override it: the locale
     * service throws when a namespace already has a dictionary for that
     * locale. So the wording is rewritten in the DOM instead. Every rewrite
     * happens inside a MutationObserver callback, which runs as a microtask
     * before the browser paints, so React re-rendering the duration once a
     * second never flashes the old text.
     * ------------------------------------------------------------------- */

    const RUNNING_LABEL = { from: '深度求索中', to: '罗塞塔数据解算中' }
    const SHIMMER_TEXT = 'data-shimmer-text'

    // Relabelling runs again on every mutation it causes, so it only converges
    // once the rewritten text no longer contains `from`. When `to` contains
    // `from` (or `from` is empty), every pass matches its own output: the
    // observer keeps re-queueing itself as a microtask, the queue never drains,
    // and the browser never gets to paint — the tab locks up instead of merely
    // dropping frames. That is a configuration mistake, so it fails here, at
    // load time, rather than the first time a turn runs.
    if (RUNNING_LABEL.from === '' || RUNNING_LABEL.to.includes(RUNNING_LABEL.from)) {
      throw new Error(
        'RUNNING_LABEL does not converge: `from` must be non-empty and `to` must not contain it',
      )
    }

    /** Rewrite every copy of the label inside one running row. */
    function relabel(root) {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
      for (let node = walker.nextNode(); node !== null; node = walker.nextNode()) {
        const value = node.nodeValue
        if (value === null || !value.includes(RUNNING_LABEL.from)) continue
        node.nodeValue = value.split(RUNNING_LABEL.from).join(RUNNING_LABEL.to)
      }
      // The shimmer overlay paints its sweep from this attribute, not from text,
      // so it has to be carried along or the highlight shows the old wording.
      for (const element of root.querySelectorAll(`[${SHIMMER_TEXT}]`)) {
        const value = element.getAttribute(SHIMMER_TEXT)
        if (value === null || !value.includes(RUNNING_LABEL.from)) continue
        element.setAttribute(SHIMMER_TEXT, value.split(RUNNING_LABEL.from).join(RUNNING_LABEL.to))
      }
    }

    /**
     * Follow every `[data-chat-running]` row in the document. The row mounts
     * once per Turn, so the document observer only carries the childList edge;
     * the per-row observer carries the text and attribute churn.
     */
    function watchRunningLabel() {
      const RUNNING = '[data-chat-running]'
      // One observer per row, tracked so teardown can stop all of them. A row
      // that leaves the document never mutates again, so its observer has to be
      // pruned from here — the per-row callback would never fire to clean up,
      // and this list would otherwise keep every finished row's DOM alive.
      const tracked = []
      const attached = new WeakMap()

      const prune = () => {
        for (let index = tracked.length - 1; index >= 0; index--) {
          const entry = tracked[index]
          if (entry.root.isConnected) continue
          entry.observer.disconnect()
          attached.delete(entry.root)
          tracked.splice(index, 1)
        }
      }

      const attach = (root) => {
        if (attached.has(root)) return
        relabel(root)
        const observer = new MutationObserver(() => relabel(root))
        observer.observe(root, {
          characterData: true,
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: [SHIMMER_TEXT],
        })
        attached.set(root, observer)
        tracked.push({ root, observer })
      }

      for (const root of document.querySelectorAll(RUNNING)) attach(root)

      const rows = new MutationObserver((records) => {
        prune()
        for (const record of records) {
          for (const node of record.addedNodes) {
            if (node.nodeType !== Node.ELEMENT_NODE) continue
            if (node.matches(RUNNING)) attach(node)
            const inner = node.querySelector(RUNNING)
            if (inner !== null) attach(inner)
          }
        }
      })
      rows.observe(document.body, { childList: true, subtree: true })

      return () => {
        rows.disconnect()
        for (const entry of tracked) entry.observer.disconnect()
        tracked.length = 0
      }
    }
    function loadCharacter(dir) {
      if (!dataCache.has(dir)) {
        dataCache.set(dir, build(dir).catch((error) => {
          dataCache.delete(dir)
          throw error
        }))
      }
      return dataCache.get(dir)
    }

    const CSS = `
.zzz-spine-stage {
  position: absolute;
  right: 6px;
  bottom: 0;
  width: ${STAGE_WIDTH}px;
  height: ${STAGE_HEIGHT}px;
  pointer-events: none;
  display: block;
}
.zzz-spine-hit {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  /* The stage ignores pointer events; a document-level router decides
     whether a press landed on the painted figure. */
  pointer-events: none;
  border-radius: 12px;
  -webkit-tap-highlight-color: transparent;
}
.zzz-spine-hit:focus-visible {
  outline: 2px solid var(--dsw-alias-border-focus, #4c8dff);
  outline-offset: 2px;
}
.zzz-spine-hit canvas {
  width: 100%;
  height: 100%;
  display: block;
  pointer-events: none;
  opacity: 1;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.45));
  transition: transform 200ms ease, filter 200ms ease, opacity 220ms ease;
}
/* The pointer router sets data-hover only over painted pixels. The lift is
   cosmetic; hit testing keeps using the untransformed stage box. */
.zzz-spine-stage[data-hover] canvas {
  transform: translateY(-2px) scale(1.015);
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.5));
}
/* Faded: the figure is a ghost and the stage lets every press through, so
   even controls behind the painted body can be used. */
.zzz-spine-stage[data-faded] .zzz-spine-hit canvas {
  opacity: 0.12;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.12));
}
/* Lock control. It stays in the DOM so it can be reached from the keyboard,
   but it only becomes visible while the pointer is on the figure (or the
   button itself is focused). Locking keeps the ghost and the click-through
   in place until it is unlocked again. */
.zzz-spine-lock {
  position: absolute;
  top: 2px;
  left: 2px;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  margin: 0;
  padding: 0;
  border: 1px solid var(--dsw-alias-border-l1, rgba(255, 255, 255, 0.16));
  border-radius: 999px;
  background: var(--dsw-alias-bg-module-platform, rgba(30, 30, 30, 0.78));
  color: var(--dsw-alias-label-secondary, #c8c8c8);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
  opacity: 0;
  transform: translateY(-2px) scale(0.96);
  pointer-events: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: opacity 140ms ease, transform 140ms ease, color 140ms ease, border-color 140ms ease;
}
.zzz-spine-stage[data-lock-visible] .zzz-spine-lock,
.zzz-spine-lock:focus-visible {
  opacity: 1;
  transform: none;
  pointer-events: auto;
}
.zzz-spine-lock:hover,
.zzz-spine-lock:focus-visible {
  color: var(--dsw-alias-label-primary, #ffffff);
  border-color: var(--dsw-alias-border-focus, rgba(120, 170, 255, 0.6));
}
.zzz-spine-stage[data-locked] .zzz-spine-lock {
  color: var(--dsw-alias-label-primary, #ffffff);
  border-color: var(--dsw-alias-border-focus, rgba(120, 170, 255, 0.65));
  background: rgba(76, 141, 255, 0.22);
}
.zzz-spine-lock:focus-visible {
  outline: 2px solid var(--dsw-alias-border-focus, #4c8dff);
  outline-offset: 2px;
}

/* Fingers need a bigger target than a mouse pointer. */
@media (any-pointer: coarse) {
  .zzz-spine-lock {
    width: 32px;
    height: 32px;
  }
}

/* Only painted pixels are clickable, so the stage keeps its default cursor;
   the router marks the hovered <html> while the pointer is over the figure. */
html.zzz-spine-pointer,
html.zzz-spine-pointer body {
  cursor: pointer;
}
.zzz-spine-glow {
  position: absolute;
  left: 50%;
  bottom: 2px;
  width: 150px;
  height: 150px;
  margin-left: -75px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(120, 170, 255, 0.22) 0%, rgba(120, 170, 255, 0) 70%);
  pointer-events: none;
  transition: opacity 220ms ease;
}
.zzz-spine-stage[data-faded] .zzz-spine-glow {
  opacity: 0.25;
}
/* The queue strip is a flow sibling rendered before the composer, so the
   card's floating figure would otherwise paint over its header chevron and
   row actions and swallow their clicks. Lift the strip back above the figure;
   composer overlays that must stay on top carry their own higher z-index. */
[data-queue-dock] {
  position: relative;
  z-index: 2;
}

/* -------------------------------------------------------------------------
   Running-turn flower

   Chat renders its running indicator as [data-chat-running]; inside it the
   icon is the only child carrying an svg, and it sits in a fixed square that
   the clock was laid out around. Keep that square and its size, drop the whale
   inside it, and spin the event flower there instead: layout does not change
   and the swap costs no reflow.
   ---------------------------------------------------------------------- */
[data-chat-running] :where(span, div):has(> svg) {
  background-image: url('data:image/png;base64,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');
  background-position: center;
  background-repeat: no-repeat;
  /* A background is always clipped to the border box, so this must fit inside
     Chat's 14px square: overshooting would slice the petals off. */
  background-size: contain;
  transform-origin: 50% 50%;
  animation: zzz-flower-spin 3333.333ms linear infinite;
  will-change: transform;
}

/* The whale (animated mask and its static fallback) leaves the square to the
   flower; the decorative square keeps its own accessibility hiding. */
[data-chat-running] :where(span, div):has(> svg) > * {
  display: none !important;
}
/* The event engine turns the bone a full -360deg every 1/0.3 s. */
@keyframes zzz-flower-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
}

@media (prefers-reduced-motion: reduce) {
  [data-chat-running] :where(span, div):has(> svg) {
    animation: none;
  }
}
`

    function Stage() {
      const canvasRef = React.useRef(null)
      const stageRef = React.useRef(null)
      // A stored lock mounts straight into the ghost pose: the fade the lock
      // implies must exist before the first paint, not after a press.
      const [locked, setLocked] = React.useState(readStoredLock)
      const [faded, setFaded] = React.useState(locked)
      const fadedRef = React.useRef(locked)
      const syncRef = React.useRef(null)
      const [failed, setFailed] = React.useState(false)
      const character = CHARACTER
      const hoveredRef = React.useRef(false)
      const lockedRef = React.useRef(locked)
      const lockVisibleRef = React.useRef(false)
      const maskRef = React.useRef(null)
      const [hovered, setHovered] = React.useState(false)
      const [lockVisible, setLockVisible] = React.useState(false)

      const setHover = React.useCallback((next) => {
        if (hoveredRef.current === next) return
        hoveredRef.current = next
        setHovered(next)
      }, [])

      const setLockShown = React.useCallback((next) => {
        if (lockVisibleRef.current === next) return
        lockVisibleRef.current = next
        setLockVisible(next)
      }, [])

      // Fade and lock actions only touch refs and state, so the pointer router,
      // the keyboard path and the lock control can share them across renders.
      const setFadedState = React.useCallback((next) => {
        if (fadedRef.current === next) return
        fadedRef.current = next
        setFaded(next)
        setHover(false)
        if (syncRef.current !== null) syncRef.current()
      }, [setHover])
      const toggleFade = React.useCallback(() => {
        setFadedState(!fadedRef.current)
      }, [setFadedState])
      const restore = React.useCallback(() => setFadedState(false), [setFadedState])
      // Unlocking is a choice worth remembering too: leaving a session with
      // the figure restored must not bring the ghost back on the next one.
      const unlock = React.useCallback(() => {
        lockedRef.current = false
        setLocked(false)
        setFadedState(false)
        writeStoredLock(false)
      }, [setFadedState])
      const toggleLock = React.useCallback(() => {
        if (lockedRef.current) {
          unlock()
          return
        }
        lockedRef.current = true
        setLocked(true)
        setFadedState(true)
        writeStoredLock(true)
      }, [setFadedState, unlock])
      const activateFigure = React.useCallback(() => {
        if (lockedRef.current) {
          unlock()
          return
        }
        toggleFade()
      }, [toggleFade, unlock])

      // Every page of the GUI in this browser shares the preference, so a tab
      // that flips the lock tells the others through the `storage` event. The
      // writer never receives its own event, so this cannot loop.
      React.useEffect(() => {
        const onStorage = (event) => {
          if (event.key !== null && event.key !== LOCK_STORAGE_KEY) return
          // `key === null` means clear(): re-read whatever survived.
          const next = event.key === null ? readStoredLock() : event.newValue === '1'
          if (lockedRef.current === next) return
          lockedRef.current = next
          setLocked(next)
          setFadedState(next)
        }
        window.addEventListener('storage', onStorage)
        return () => window.removeEventListener('storage', onStorage)
      }, [setFadedState])
      React.useEffect(() => {
        let disposed = false
        let rig = null
        let glFigure = null
        let frame = 0
        let drawn = 0
        let intersecting = true
        let pageVisible = document.visibilityState !== 'hidden'

        const motion = typeof window.matchMedia === 'function'
          ? window.matchMedia('(prefers-reduced-motion: reduce)')
          : null
        const canvas = canvasRef.current
        const stage = stageRef.current

        /**
         * A frame is only owed to a figure the viewer can actually see moving,
         * on the active tab, not faded out, and not under a reduced-motion
         * preference. Everything else is charge for nothing.
         */
        const shouldRun = () => rig !== null &&
          !(motion !== null && motion.matches) &&
          pageVisible && intersecting && !fadedRef.current

        const tick = (now) => {
          frame = 0
          if (disposed || !shouldRun()) return
          // Measured against the last painted frame instead of an accumulator:
          // an accumulator drifts into the wrong multiple of the interval when
          // 60 Hz steps sum to just under the threshold in floating point.
          if (now - drawn >= FRAME_INTERVAL - 1) {
            // Clamp so a stall or a hidden tab resumes smoothly instead of
            // jumping a quarter second into the loop.
            rig.paint(Math.min(0.1, (now - drawn) / 1000))
            drawn = now
          }
          frame = window.requestAnimationFrame(tick)
        }

        const sync = () => {
          if (disposed) return
          if (shouldRun()) {
            if (frame === 0) {
              drawn = performance.now()
              frame = window.requestAnimationFrame(tick)
            }
            return
          }
          if (frame !== 0) {
            window.cancelAnimationFrame(frame)
            frame = 0
          }
          // Freezing must not blank the stage: repaint the held pose once.
          if (rig !== null) rig.paint(0)
        }
        syncRef.current = sync

        const visibility = typeof IntersectionObserver === 'function'
          ? new IntersectionObserver((entries) => {
            const entry = entries[entries.length - 1]
            intersecting = entry === undefined ? true : entry.isIntersecting
            sync()
          })
          : null
        if (visibility !== null && stage !== null) visibility.observe(stage)

        const resize = typeof ResizeObserver === 'function'
          ? new ResizeObserver(() => {
            if (rig === null) return
            rig.resize()
            rig.paint(0)
          })
          : null
        if (resize !== null && canvas !== null) resize.observe(canvas)

        const onPageVisibility = () => {
          pageVisible = document.visibilityState !== 'hidden'
          sync()
        }
        const onMotionChange = () => sync()
        document.addEventListener('visibilitychange', onPageVisibility)
        if (motion !== null && motion.addEventListener !== undefined) {
          motion.addEventListener('change', onMotionChange)
        }

        setFailed(false)
        loadCharacter(character.dir).then((data) => {
          if (disposed) return
          if (canvas === null) return
          const skeleton = new spine.Skeleton(data.skeletonData)
          const skinName = pickSkin(skeleton, data.skeletonData)
          const skin = skinName === null ? null : data.skeletonData.findSkin(skinName)
          if (skinName !== null) skeleton.setSkinByName(skinName)
          skeleton.setToSetupPose()
          const state = new spine.AnimationState(new spine.AnimationStateData(data.skeletonData))
          state.setAnimation(0, data.animation, true)
          state.update(0.2 + Math.random() * 1.2)
          state.apply(skeleton)
          // 4.3 runtimes no longer transform bones inside apply().
          skeleton.updateWorldTransform(spine.Physics.update)
          const fit = data.fit
          let pixelRatio = 1

          // WebGL first: the GPU fills neighbouring triangles with one fill rule,
          // so the mesh cannot show the Canvas2D clip seams at all. Without a
          // WebGL context (or on a multi-page atlas) the seamed-but-overlapped
          // Canvas2D path takes over.
          let context = null
          if (fit !== null && data.pageCount === 1 && data.image !== undefined) {
            try {
              glFigure = createWebGlFigure(canvas, data.image, fit)
              glFigure.build(skeleton, skin)
            } catch {
              glFigure = null
            }
          }
          if (glFigure === null) context = canvas.getContext('2d')

          // The backing store follows the CSS box. Reading `clientWidth` inside
          // the loop would force a layout on every frame; a ResizeObserver is
          // the one place that has to know instead.
          const resizeCanvas = () => {
            // A phone's 3x screen would otherwise upsample a 2x backing store and
            // smear the figure; the cost is per triangle, not per pixel, so native
            // resolution on a 3x device is nearly free. Cap it so an exotic 4x
            // screen does not pay for fill that nobody can see at 180x240.
            pixelRatio = Math.min(window.devicePixelRatio || 1, 3)
            const width = Math.round((canvas.clientWidth || STAGE_WIDTH) * pixelRatio)
            const height = Math.round((canvas.clientHeight || STAGE_HEIGHT) * pixelRatio)
            if (canvas.width !== width || canvas.height !== height) {
              canvas.width = width
              canvas.height = height
            }
          }

          // The hit mask is rebuilt from what was just painted: a WebGL figure
          // renders a 45×60 framebuffer and reads it back; the Canvas2D fallback
          // downsamples the visible canvas. Starting at MASK_FRAMES - 1 makes the
          // first paint below refresh it.
          let maskCanvas = null
          let maskContext = null
          const cells = new Uint8Array(MASK_WIDTH * MASK_HEIGHT)
          let maskFrame = MASK_FRAMES - 1
          if (glFigure === null) {
            maskCanvas = document.createElement('canvas')
            maskCanvas.width = MASK_WIDTH
            maskCanvas.height = MASK_HEIGHT
            maskContext = maskCanvas.getContext('2d', { willReadFrequently: true })
          }

          const refreshMask = () => {
            if (glFigure !== null) {
              const result = glFigure.readMask(pixelRatio)
              maskRef.current = result === null
                ? null
                : { width: MASK_WIDTH, height: MASK_HEIGHT, cells: result.cells }
              return
            }
            if (maskContext === null) return
            try {
              maskContext.clearRect(0, 0, MASK_WIDTH, MASK_HEIGHT)
              maskContext.drawImage(canvas, 0, 0, MASK_WIDTH, MASK_HEIGHT)
              const pixels = maskContext.getImageData(0, 0, MASK_WIDTH, MASK_HEIGHT).data
              for (let cell = 0; cell < cells.length; cell++) {
                cells[cell] = pixels[cell * 4 + 3] >= MASK_THRESHOLD ? 1 : 0
              }
              maskRef.current = { width: MASK_WIDTH, height: MASK_HEIGHT, cells }
            } catch {
              // A tainted canvas cannot be read. Without a mask every press
              // falls through, which is better than blocking the page.
              maskRef.current = null
            }
          }
          const paint = (delta) => {
            if (glFigure !== null) {
              state.update(delta)
              state.apply(skeleton)
              skeleton.updateWorldTransform(spine.Physics.update)
              glFigure.paint(skeleton, pixelRatio)
            } else {
              if (context === null) return
              context.setTransform(1, 0, 0, 1, 0, 0)
              context.clearRect(0, 0, canvas.width, canvas.height)
              if (fit === null) return
              context.setTransform(
                fit.a * pixelRatio, 0, 0, -fit.a * pixelRatio,
                fit.e * pixelRatio, fit.f * pixelRatio,
              )
              state.update(delta)
              state.apply(skeleton)
              skeleton.updateWorldTransform(spine.Physics.update)
              drawSkeleton(context, skeleton, SEAM_OVERLAP / (fit.a * pixelRatio))
            }
            if (++maskFrame >= MASK_FRAMES) {
              maskFrame = 0
              refreshMask()
            }
          }

          rig = {
            paint,
            resize: () => {
              resizeCanvas()
              // Force the paint that follows to rebuild the mask at the new size.
              maskFrame = MASK_FRAMES - 1
            },
          }
          if (glFigure !== null) {
            // A lost context comes back empty; repaint the current pose so the
            // figure does not stay blank until the next tick (which is paused
            // whenever the figure is faded).
            glFigure.onRestore = () => {
              if (disposed) return
              rig.paint(0)
            }
          }
          resizeCanvas()
          // Paint one frame synchronously: a background tab never runs
          // requestAnimationFrame, and the stage must not look empty then.
          paint(0.2)
          sync()
        }).catch(() => {
          if (!disposed) setFailed(true)
        })

        return () => {
          disposed = true
          if (frame) window.cancelAnimationFrame(frame)
          frame = 0
          if (visibility !== null) visibility.disconnect()
          if (resize !== null) resize.disconnect()
          document.removeEventListener('visibilitychange', onPageVisibility)
          if (motion !== null && motion.removeEventListener !== undefined) {
            motion.removeEventListener('change', onMotionChange)
          }
          syncRef.current = null
          maskRef.current = null
          if (glFigure !== null) {
            glFigure.dispose()
            glFigure = null
          }
          rig = null
        }
      }, [character.dir])

      /**
       * Pointer routing. The stage and its hit layer are pointer-events: none,
       * so a press only belongs to the figure when this router says it landed
       * on a painted pixel and the figure is what is painted there. Everything
       * else — the empty corners of the stage, the page under a faded figure —
       * keeps its normal target.
       */
      React.useEffect(() => {
        const stage = stageRef.current
        if (stage === null) return undefined

        let armed = false
        let guardUntil = 0
        let timer = 0
        // Remember what pressed last: a touch has no hover, so the lock chip has
        // to be retired by the router itself once it has been used.
        let lastPointerType = ''
        const isInside = (rect, x, y) =>
          x >= rect.left && x < rect.right && y >= rect.top && y < rect.bottom

        // The stage, not the canvas: a hover lift moves the canvas visually,
        // and the hit area must not move with it or the pointer flickers at
        // the silhouette's edge.
        const hitsFigure = (rect, x, y) => {
          const mask = maskRef.current
          if (mask === null) return false
          if (rect.width === 0 || rect.height === 0) return false
          if (!isInside(rect, x, y)) return false
          const column = Math.min(mask.width - 1, Math.floor(((x - rect.left) / rect.width) * mask.width))
          const row = Math.min(mask.height - 1, Math.floor(((y - rect.top) / rect.height) * mask.height))
          return mask.cells[row * mask.width + column] === 1
        }

        const isInsideStage = (x, y) => isInside(stage.getBoundingClientRect(), x, y)

        let flashTimer = 0

        const fromLockButton = (event) => event.target instanceof Element &&
          event.target.closest('.zzz-spine-lock') !== null

        const clearFlash = () => {
          if (flashTimer !== 0) {
            window.clearTimeout(flashTimer)
            flashTimer = 0
          }
        }

        // Touch has no hover, so a tap reveals the lock for a few seconds
        // instead of leaving it on screen for good.
        const flashLock = () => {
          setLockShown(true)
          clearFlash()
          flashTimer = window.setTimeout(() => {
            flashTimer = 0
            setLockShown(false)
          }, 4000)
        }

        /**
         * Menus and the queue strip can paint above the figure while the
         * figure's box covers the same point. `elementsFromPoint` skips a
         * pointer-events: none stage, so switch it on for the query and look
         * at what is painted in front of it.
         */
        const figureIsTopmost = (x, y) => {
          if (typeof document.elementsFromPoint !== 'function') return true
          const previous = stage.style.pointerEvents
          stage.style.pointerEvents = 'auto'
          let stack
          try {
            stack = document.elementsFromPoint(x, y)
          } finally {
            stage.style.pointerEvents = previous
          }
          const index = stack.indexOf(stage)
          if (index < 0) return false
          for (let position = 0; position < index; position++) {
            if (!stage.contains(stack[position])) return false
          }
          return true
        }

        const disarm = () => {
          armed = false
          if (timer !== 0) {
            window.clearTimeout(timer)
            timer = 0
          }
        }

        const arm = () => {
          armed = true
          if (timer !== 0) window.clearTimeout(timer)
          // A press that never becomes a click (drag, cancel) must not keep
          // swallowing the next click elsewhere on the page.
          timer = window.setTimeout(disarm, 1000)
        }

        const onPointerDown = (event) => {
          // Only a primary press belongs to the figure; right-click and
          // middle-click stay with the page (context menu, autoscroll).
          if (event.button !== 0) return
          lastPointerType = event.pointerType
          // A new press owns whatever click follows it; a press that was
          // dragged away must not swallow this one.
          disarm()
          // The lock is the one control inside the stage that must always
          // receive its own press, even while the stage is click-through.
          if (fromLockButton(event)) return
          const x = event.clientX
          const y = event.clientY
          const rect = stage.getBoundingClientRect()
          if (fadedRef.current) {
            // Faded is click-through. Pressing outside the stage restores an
            // unlocked figure; presses inside it go to the page unchanged, so
            // controls behind the figure can be used one after another.
            const inside = isInside(rect, x, y)
            if (!inside) {
              // Any press off the figure puts the chip away right now; an
              // unlocked figure also comes back. A locked one stays ghosted, but
              // the end of the interaction is still the moment to hide the chip
              // rather than leave it up for the rest of the touch flash window.
              clearFlash()
              setLockShown(false)
              if (!lockedRef.current) restore()
              return
            }
            if (event.pointerType !== 'mouse') flashLock()
            if (inside && performance.now() < guardUntil) {
              // The second click of a double click would otherwise land on the
              // control the fade just revealed.
              event.preventDefault()
              event.stopPropagation()
              arm()
            }
            return
          }

          if (!hitsFigure(rect, x, y) || !figureIsTopmost(x, y)) return
          event.preventDefault()
          event.stopPropagation()
          arm()
          guardUntil = performance.now() + THROUGH_GUARD_MS
          toggleFade()
          if (event.pointerType !== 'mouse') flashLock()
        }

        const onPointerMove = (event) => {
          if (event.pointerType === 'touch') return
          // A moving mouse owns the hover state; drop any touch flash timer.
          if (flashTimer !== 0) {
            window.clearTimeout(flashTimer)
            flashTimer = 0
          }
          const x = event.clientX
          const y = event.clientY
          const rect = stage.getBoundingClientRect()
          const inside = isInside(rect, x, y)
          const hit = hitsFigure(rect, x, y)
          // Once shown, the lock stays visible while the pointer is anywhere in
          // the stage, so moving from the body to the button does not make it
          // disappear on the way.
          setLockShown(hit || fromLockButton(event) || (lockVisibleRef.current && inside))
          setHover(!fadedRef.current && hit)
        }

        const onLeave = () => {
          setHover(false)
          setLockShown(false)
          clearFlash()
        }

        const swallow = (event) => {
          if (!armed || fromLockButton(event)) return
          if (!isInsideStage(event.clientX, event.clientY)) return
          event.preventDefault()
          event.stopPropagation()
        }

        const onClick = (event) => {
          if (fromLockButton(event)) {
            // The lock chip has just done its job. Hiding it here is what keeps a
            // phone from showing a dead button for the remaining seconds of the
            // 4 s touch flash; a mouse keeps it because the pointer still rests
            // on it, and keyboard activation keeps it through :focus-visible.
            disarm()
            if (event.detail !== 0 && lastPointerType !== 'mouse') {
              clearFlash()
              setLockShown(false)
            }
            return
          }
          if (!armed) return
          // Keyboard activation has no pointer press behind it; never eat it.
          if (event.detail === 0) {
            disarm()
            return
          }
          if (!isInsideStage(event.clientX, event.clientY)) {
            disarm()
            return
          }
          disarm()
          event.preventDefault()
          event.stopPropagation()
        }

        const onPointerCancel = () => {
          if (armed) disarm()
        }

        const onKeyDown = (event) => {
          if (event.key !== 'Escape' || !fadedRef.current) return
          const active = document.activeElement
          if (active !== stage && !stage.contains(active)) return
          event.stopPropagation()
          unlock()
        }

        // Capture on the window: a press has to be routed before the page's
        // own handlers or the target's default action can see it.
        window.addEventListener('pointerdown', onPointerDown, true)
        window.addEventListener('pointermove', onPointerMove, { capture: true, passive: true })
        window.addEventListener('mousedown', swallow, true)
        window.addEventListener('mouseup', swallow, true)
        window.addEventListener('click', onClick, true)
        window.addEventListener('pointercancel', onPointerCancel, true)
        window.addEventListener('blur', onLeave)
        document.addEventListener('visibilitychange', onLeave)
        document.addEventListener('keydown', onKeyDown, true)

        return () => {
          window.removeEventListener('pointerdown', onPointerDown, true)
          window.removeEventListener('pointermove', onPointerMove, true)
          window.removeEventListener('mousedown', swallow, true)
          window.removeEventListener('mouseup', swallow, true)
          window.removeEventListener('click', onClick, true)
          window.removeEventListener('pointercancel', onPointerCancel, true)
          window.removeEventListener('blur', onLeave)
          document.removeEventListener('visibilitychange', onLeave)
          document.removeEventListener('keydown', onKeyDown, true)
          clearFlash()
          disarm()
        }
      }, [restore, setHover, setLockShown, toggleFade, unlock])

      // A pointer cursor over the painted figure without giving the stage any
      // hit area of its own. Descendants with their own cursor still win.
      React.useEffect(() => {
        if (!hovered) return undefined
        const root = document.documentElement
        root.classList.add('zzz-spine-pointer')
        return () => root.classList.remove('zzz-spine-pointer')
      }, [hovered])

      // No tooltip: a popover on the figure hides the very thing a click is
      // meant to reveal. The lock is icon-only; the figure's state lives in
      // its accessible name for keyboard and screen-reader users.
      const label = failed
        ? '立绘素材加载失败'
        : faded
          ? locked
            ? `${character.name}，已锁定点击穿透，按 Enter 解锁`
            : `${character.name}，点击穿透中，按 Enter 或点页面别处恢复`
          : `${character.name}，点击变透明并让出点击`
      return h('div', {
        ref: stageRef,
        className: 'zzz-spine-stage',
        'data-faded': faded ? '' : undefined,
        'data-hover': hovered ? '' : undefined,
        'data-locked': locked ? '' : undefined,
        'data-lock-visible': lockVisible ? '' : undefined,
      },
        h('div', { className: 'zzz-spine-glow', 'aria-hidden': true }),
        h('button', {
          type: 'button',
          className: 'zzz-spine-hit',
          'aria-label': label,
          'aria-pressed': faded,
          onClick: activateFigure,
        }, h('canvas', { ref: canvasRef, 'aria-hidden': true })),
        h('button', {
          type: 'button',
          className: 'zzz-spine-lock',
          'aria-label': locked ? '取消锁定，恢复立绘' : '锁定为点击穿透',
          'aria-pressed': locked,
          onClick: toggleLock,
        }, h('svg', {
          viewBox: '0 0 16 16',
          width: 14,
          height: 14,
          'aria-hidden': true,
          focusable: 'false',
        },
        h('rect', {
          x: 3.5,
          y: 7,
          width: 9,
          height: 6.5,
          rx: 1.5,
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 1.3,
        }),
        h('path', {
          d: locked
            ? 'M5.5 7V5.2a2.5 2.5 0 0 1 5 0V7'
            : 'M5.5 7V5.2a2.5 2.5 0 0 1 4.7-1.2',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 1.3,
          strokeLinecap: 'round',
        }))),
      )
    }

    /**
     * The composer overlay. The decoration deliberately leaves the blank
     * New-session page plain: the events' key-visual animation cost more than
     * it returned there, so only the corner figure is rendered now.
     */
    function ZzzSpine() {
      return h(React.Fragment, null,
        h('style', null, CSS),
        h(Stage),
      )
    }

    return {
      inject: ['slots'],
      apply(ctx) {
        ctx.effect(() => watchRunningLabel(), 'zzz-spine: running-turn label')
        ctx.slots.inject('conversation.input.overlay', () => ctx.slots.register({
          name: 'conversation.input.overlay',
          id: 'zzz-spine',
          order: 20,
        }, ZzzSpine))
      },
    }
  },
})



