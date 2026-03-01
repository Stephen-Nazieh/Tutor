;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="1cbb92d3-4e1b-e544-d89b-6a9441fe75f6")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,50654,(e,t,n)=>{"use strict";var i=e.r(800592),r=e.r(90550),s="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},a=r.useSyncExternalStore,o=i.useRef,l=i.useEffect,c=i.useMemo,d=i.useDebugValue;n.useSyncExternalStoreWithSelector=function(e,t,n,i,r){var u=o(null);if(null===u.current){var f={hasValue:!1,value:null};u.current=f}else f=u.current;var p=a(e,(u=c(function(){function e(e){if(!l){if(l=!0,a=e,e=i(e),void 0!==r&&f.hasValue){var t=f.value;if(r(t,e))return o=t}return o=e}if(t=o,s(a,e))return t;var n=i(e);return void 0!==r&&r(t,n)?(a=e,t):(a=e,o=n)}var a,o,l=!1,c=void 0===n?null:n;return[function(){return e(t())},null===c?void 0:function(){return e(c())}]},[t,n,i,r]))[0],u[1]);return l(function(){f.hasValue=!0,f.value=p},[p]),d(p),p}},694542,(e,t,n)=>{"use strict";t.exports=e.r(50654)},780406,e=>{"use strict";function t(){return(t=Object.assign.bind()).apply(null,arguments)}e.s(["default",()=>t])},214371,e=>{"use strict";let t=e=>{let t,n=new Set,i=(e,i)=>{let r="function"==typeof e?e(t):e;if(!Object.is(r,t)){let e=t;t=(null!=i?i:"object"!=typeof r||null===r)?r:Object.assign({},t,r),n.forEach(n=>n(t,e))}},r=()=>t,s={setState:i,getState:r,getInitialState:()=>a,subscribe:e=>(n.add(e),()=>n.delete(e))},a=t=e(i,r,s);return s},n=e=>e?t(e):t;e.s(["createStore",()=>n])},143794,e=>{"use strict";let t=(0,e.i(879191).default)("map-pin",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);e.s(["MapPin",()=>t],143794)},167604,84640,e=>{"use strict";var t=e.i(879191);let n=(0,t.default)("wifi",[["path",{d:"M12 20h.01",key:"zekei9"}],["path",{d:"M2 8.82a15 15 0 0 1 20 0",key:"dnpr2z"}],["path",{d:"M5 12.859a10 10 0 0 1 14 0",key:"1x1e6c"}],["path",{d:"M8.5 16.429a5 5 0 0 1 7 0",key:"1bycff"}]]);e.s(["Wifi",()=>n],167604);let i=(0,t.default)("wifi-off",[["path",{d:"M12 20h.01",key:"zekei9"}],["path",{d:"M8.5 16.429a5 5 0 0 1 7 0",key:"1bycff"}],["path",{d:"M5 12.859a10 10 0 0 1 5.17-2.69",key:"1dl1wf"}],["path",{d:"M19 12.859a10 10 0 0 0-2.007-1.523",key:"4k23kn"}],["path",{d:"M2 8.82a15 15 0 0 1 4.177-2.643",key:"1grhjp"}],["path",{d:"M22 8.82a15 15 0 0 0-11.288-3.764",key:"z3jwby"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]]);e.s(["WifiOff",()=>i],84640)},133137,e=>{"use strict";let t,n;var i=e.i(780406),r=e.i(800592),s=e.i(7338),a=e.i(293741),o=s,l=s;let c=new l.Box3,d=new l.Vector3;class u extends l.InstancedBufferGeometry{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry",this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute("position",new l.Float32BufferAttribute([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute("uv",new l.Float32BufferAttribute([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return void 0!==t&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new l.InstancedInterleavedBuffer(t,6,1);return this.setAttribute("instanceStart",new l.InterleavedBufferAttribute(n,3,0)),this.setAttribute("instanceEnd",new l.InterleavedBufferAttribute(n,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let n;e instanceof Float32Array?n=e:Array.isArray(e)&&(n=new Float32Array(e));let i=new l.InstancedInterleavedBuffer(n,2*t,1);return this.setAttribute("instanceColorStart",new l.InterleavedBufferAttribute(i,t,0)),this.setAttribute("instanceColorEnd",new l.InterleavedBufferAttribute(i,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new l.WireframeGeometry(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){null===this.boundingBox&&(this.boundingBox=new l.Box3);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;void 0!==e&&void 0!==t&&(this.boundingBox.setFromBufferAttribute(e),c.setFromBufferAttribute(t),this.boundingBox.union(c))}computeBoundingSphere(){null===this.boundingSphere&&(this.boundingSphere=new l.Sphere),null===this.boundingBox&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(void 0!==e&&void 0!==t){let n=this.boundingSphere.center;this.boundingBox.getCenter(n);let i=0;for(let r=0,s=e.count;r<s;r++)d.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(d)),d.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(d));this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}var f=s,p=e.i(149153);let h=parseInt(s.REVISION.replace(/\D+/g,""));class m extends f.ShaderMaterial{constructor(e){super({type:"LineMaterial",uniforms:f.UniformsUtils.clone(f.UniformsUtils.merge([p.UniformsLib.common,p.UniformsLib.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new f.Vector2(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
				#include <common>
				#include <fog_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>

				uniform float linewidth;
				uniform vec2 resolution;

				attribute vec3 instanceStart;
				attribute vec3 instanceEnd;

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
						attribute vec4 instanceColorStart;
						attribute vec4 instanceColorEnd;
					#else
						varying vec3 vLineColor;
						attribute vec3 instanceColorStart;
						attribute vec3 instanceColorEnd;
					#endif
				#endif

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#ifdef USE_DASH

					uniform float dashScale;
					attribute float instanceDistanceStart;
					attribute float instanceDistanceEnd;
					varying float vLineDistance;

				#endif

				void trimSegment( const in vec4 start, inout vec4 end ) {

					// trim end segment so it terminates between the camera plane and the near plane

					// conservative estimate of the near plane
					float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
					float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
					float nearEstimate = - 0.5 * b / a;

					float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

					end.xyz = mix( start.xyz, end.xyz, alpha );

				}

				void main() {

					#ifdef USE_COLOR

						vLineColor = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

					#endif

					#ifdef USE_DASH

						vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
						vUv = uv;

					#endif

					float aspect = resolution.x / resolution.y;

					// camera space
					vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
					vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

					#ifdef WORLD_UNITS

						worldStart = start.xyz;
						worldEnd = end.xyz;

					#else

						vUv = uv;

					#endif

					// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
					// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
					// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
					// perhaps there is a more elegant solution -- WestLangley

					bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

					if ( perspective ) {

						if ( start.z < 0.0 && end.z >= 0.0 ) {

							trimSegment( start, end );

						} else if ( end.z < 0.0 && start.z >= 0.0 ) {

							trimSegment( end, start );

						}

					}

					// clip space
					vec4 clipStart = projectionMatrix * start;
					vec4 clipEnd = projectionMatrix * end;

					// ndc space
					vec3 ndcStart = clipStart.xyz / clipStart.w;
					vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

					// direction
					vec2 dir = ndcEnd.xy - ndcStart.xy;

					// account for clip-space aspect ratio
					dir.x *= aspect;
					dir = normalize( dir );

					#ifdef WORLD_UNITS

						// get the offset direction as perpendicular to the view vector
						vec3 worldDir = normalize( end.xyz - start.xyz );
						vec3 offset;
						if ( position.y < 0.5 ) {

							offset = normalize( cross( start.xyz, worldDir ) );

						} else {

							offset = normalize( cross( end.xyz, worldDir ) );

						}

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

						// don't extend the line if we're rendering dashes because we
						// won't be rendering the endcaps
						#ifndef USE_DASH

							// extend the line bounds to encompass  endcaps
							start.xyz += - worldDir * linewidth * 0.5;
							end.xyz += worldDir * linewidth * 0.5;

							// shift the position of the quad so it hugs the forward edge of the line
							offset.xy -= dir * forwardOffset;
							offset.z += 0.5;

						#endif

						// endcaps
						if ( position.y > 1.0 || position.y < 0.0 ) {

							offset.xy += dir * 2.0 * forwardOffset;

						}

						// adjust for linewidth
						offset *= linewidth * 0.5;

						// set the world position
						worldPos = ( position.y < 0.5 ) ? start : end;
						worldPos.xyz += offset;

						// project the worldpos
						vec4 clip = projectionMatrix * worldPos;

						// shift the depth of the projected points so the line
						// segments overlap neatly
						vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
						clip.z = clipPose.z * clip.w;

					#else

						vec2 offset = vec2( dir.y, - dir.x );
						// undo aspect ratio adjustment
						dir.x /= aspect;
						offset.x /= aspect;

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						// endcaps
						if ( position.y < 0.0 ) {

							offset += - dir;

						} else if ( position.y > 1.0 ) {

							offset += dir;

						}

						// adjust for linewidth
						offset *= linewidth;

						// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
						offset /= resolution.y;

						// select end
						vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

						// back to clip space
						offset *= clip.w;

						clip.xy += offset;

					#endif

					gl_Position = clip;

					vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					#include <fog_vertex>

				}
			`,fragmentShader:`
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float linewidth;

				#ifdef USE_DASH

					uniform float dashOffset;
					uniform float dashSize;
					uniform float gapSize;

				#endif

				varying float vLineDistance;

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#include <common>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
					#else
						varying vec3 vLineColor;
					#endif
				#endif

				vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

					float mua;
					float mub;

					vec3 p13 = p1 - p3;
					vec3 p43 = p4 - p3;

					vec3 p21 = p2 - p1;

					float d1343 = dot( p13, p43 );
					float d4321 = dot( p43, p21 );
					float d1321 = dot( p13, p21 );
					float d4343 = dot( p43, p43 );
					float d2121 = dot( p21, p21 );

					float denom = d2121 * d4343 - d4321 * d4321;

					float numer = d1343 * d4321 - d1321 * d4343;

					mua = numer / denom;
					mua = clamp( mua, 0.0, 1.0 );
					mub = ( d1343 + d4321 * ( mua ) ) / d4343;
					mub = clamp( mub, 0.0, 1.0 );

					return vec2( mua, mub );

				}

				void main() {

					#include <clipping_planes_fragment>

					#ifdef USE_DASH

						if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

						if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

					#endif

					float alpha = opacity;

					#ifdef WORLD_UNITS

						// Find the closest points on the view ray and the line segment
						vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
						vec3 lineDir = worldEnd - worldStart;
						vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

						vec3 p1 = worldStart + lineDir * params.x;
						vec3 p2 = rayEnd * params.y;
						vec3 delta = p1 - p2;
						float len = length( delta );
						float norm = len / linewidth;

						#ifndef USE_DASH

							#ifdef USE_ALPHA_TO_COVERAGE

								float dnorm = fwidth( norm );
								alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

							#else

								if ( norm > 0.5 ) {

									discard;

								}

							#endif

						#endif

					#else

						#ifdef USE_ALPHA_TO_COVERAGE

							// artifacts appear on some hardware if a derivative is taken within a conditional
							float a = vUv.x;
							float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
							float len2 = a * a + b * b;
							float dlen = fwidth( len2 );

							if ( abs( vUv.y ) > 1.0 ) {

								alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

							}

						#else

							if ( abs( vUv.y ) > 1.0 ) {

								float a = vUv.x;
								float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
								float len2 = a * a + b * b;

								if ( len2 > 1.0 ) discard;

							}

						#endif

					#endif

					vec4 diffuseColor = vec4( diffuse, alpha );
					#ifdef USE_COLOR
						#ifdef USE_LINE_COLOR_ALPHA
							diffuseColor *= vLineColor;
						#else
							diffuseColor.rgb *= vLineColor;
						#endif
					#endif

					#include <logdepthbuf_fragment>

					gl_FragColor = diffuseColor;

					#include <tonemapping_fragment>
					#include <${h>=154?"colorspace_fragment":"encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(e){this.uniforms.diffuse.value=e}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(e){!0===e?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(e){this.uniforms.linewidth.value=e}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(e){!!e!="USE_DASH"in this.defines&&(this.needsUpdate=!0),!0===e?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(e){this.uniforms.dashScale.value=e}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(e){this.uniforms.dashSize.value=e}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(e){this.uniforms.dashOffset.value=e}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(e){this.uniforms.gapSize.value=e}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(e){this.uniforms.opacity.value=e}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(e){this.uniforms.resolution.value.copy(e)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(e){!!e!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),!0===e?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}}let x=h>=125?"uv1":"uv2",v=new o.Vector4,y=new o.Vector3,g=new o.Vector3,b=new o.Vector4,S=new o.Vector4,w=new o.Vector4,M=new o.Vector3,j=new o.Matrix4,A=new o.Line3,E=new o.Vector3,C=new o.Box3,_=new o.Sphere,L=new o.Vector4;function z(e,t,i){return L.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),L.multiplyScalar(1/L.w),L.x=n/i.width,L.y=n/i.height,L.applyMatrix4(e.projectionMatrixInverse),L.multiplyScalar(1/L.w),Math.abs(Math.max(L.x,L.y))}class R extends o.Mesh{constructor(e=new u,t=new m({color:0xffffff*Math.random()})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,i=new Float32Array(2*t.count);for(let e=0,r=0,s=t.count;e<s;e++,r+=2)y.fromBufferAttribute(t,e),g.fromBufferAttribute(n,e),i[r]=0===r?0:i[r-1],i[r+1]=i[r]+y.distanceTo(g);let r=new o.InstancedInterleavedBuffer(i,2,1);return e.setAttribute("instanceDistanceStart",new o.InterleavedBufferAttribute(r,1,0)),e.setAttribute("instanceDistanceEnd",new o.InterleavedBufferAttribute(r,1,1)),this}raycast(e,i){let r,s,a=this.material.worldUnits,l=e.camera;null!==l||a||console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');let c=void 0!==e.params.Line2&&e.params.Line2.threshold||0;t=e.ray;let d=this.matrixWorld,u=this.geometry,f=this.material;if(n=f.linewidth+c,null===u.boundingSphere&&u.computeBoundingSphere(),_.copy(u.boundingSphere).applyMatrix4(d),a)r=.5*n;else{let e=Math.max(l.near,_.distanceToPoint(t.origin));r=z(l,e,f.resolution)}if(_.radius+=r,!1!==t.intersectsSphere(_)){if(null===u.boundingBox&&u.computeBoundingBox(),C.copy(u.boundingBox).applyMatrix4(d),a)s=.5*n;else{let e=Math.max(l.near,C.distanceToPoint(t.origin));s=z(l,e,f.resolution)}C.expandByScalar(s),!1!==t.intersectsBox(C)&&(a?function(e,i){let r=e.matrixWorld,s=e.geometry,a=s.attributes.instanceStart,l=s.attributes.instanceEnd,c=Math.min(s.instanceCount,a.count);for(let s=0;s<c;s++){A.start.fromBufferAttribute(a,s),A.end.fromBufferAttribute(l,s),A.applyMatrix4(r);let c=new o.Vector3,d=new o.Vector3;t.distanceSqToSegment(A.start,A.end,d,c),d.distanceTo(c)<.5*n&&i.push({point:d,pointOnLine:c,distance:t.origin.distanceTo(d),object:e,face:null,faceIndex:s,uv:null,[x]:null})}}(this,i):function(e,i,r){let s=i.projectionMatrix,a=e.material.resolution,l=e.matrixWorld,c=e.geometry,d=c.attributes.instanceStart,u=c.attributes.instanceEnd,f=Math.min(c.instanceCount,d.count),p=-i.near;t.at(1,w),w.w=1,w.applyMatrix4(i.matrixWorldInverse),w.applyMatrix4(s),w.multiplyScalar(1/w.w),w.x*=a.x/2,w.y*=a.y/2,w.z=0,M.copy(w),j.multiplyMatrices(i.matrixWorldInverse,l);for(let i=0;i<f;i++){if(b.fromBufferAttribute(d,i),S.fromBufferAttribute(u,i),b.w=1,S.w=1,b.applyMatrix4(j),S.applyMatrix4(j),b.z>p&&S.z>p)continue;if(b.z>p){let e=b.z-S.z,t=(b.z-p)/e;b.lerp(S,t)}else if(S.z>p){let e=S.z-b.z,t=(S.z-p)/e;S.lerp(b,t)}b.applyMatrix4(s),S.applyMatrix4(s),b.multiplyScalar(1/b.w),S.multiplyScalar(1/S.w),b.x*=a.x/2,b.y*=a.y/2,S.x*=a.x/2,S.y*=a.y/2,A.start.copy(b),A.start.z=0,A.end.copy(S),A.end.z=0;let c=A.closestPointToPointParameter(M,!0);A.at(c,E);let f=o.MathUtils.lerp(b.z,S.z,c),h=f>=-1&&f<=1,m=M.distanceTo(E)<.5*n;if(h&&m){A.start.fromBufferAttribute(d,i),A.end.fromBufferAttribute(u,i),A.start.applyMatrix4(l),A.end.applyMatrix4(l);let n=new o.Vector3,s=new o.Vector3;t.distanceSqToSegment(A.start,A.end,s,n),r.push({point:s,pointOnLine:n,distance:t.origin.distanceTo(s),object:e,face:null,faceIndex:i,uv:null,[x]:null})}}}(this,l,i))}}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(v),this.material.uniforms.resolution.value.set(v.z,v.w))}}class P extends u{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){let t=e.length-3,n=new Float32Array(2*t);for(let i=0;i<t;i+=3)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];return super.setPositions(n),this}setColors(e,t=3){let n=e.length-t,i=new Float32Array(2*n);if(3===t)for(let r=0;r<n;r+=t)i[2*r]=e[r],i[2*r+1]=e[r+1],i[2*r+2]=e[r+2],i[2*r+3]=e[r+3],i[2*r+4]=e[r+4],i[2*r+5]=e[r+5];else for(let r=0;r<n;r+=t)i[2*r]=e[r],i[2*r+1]=e[r+1],i[2*r+2]=e[r+2],i[2*r+3]=e[r+3],i[2*r+4]=e[r+4],i[2*r+5]=e[r+5],i[2*r+6]=e[r+6],i[2*r+7]=e[r+7];return super.setColors(i,t),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class U extends R{constructor(e=new P,t=new m({color:0xffffff*Math.random()})){super(e,t),this.isLine2=!0,this.type="Line2"}}let T=r.forwardRef(function({points:e,color:t=0xffffff,vertexColors:n,linewidth:o,lineWidth:l,segments:c,dashed:d,...f},p){var h,x;let v=(0,a.useThree)(e=>e.size),y=r.useMemo(()=>c?new R:new U,[c]),[g]=r.useState(()=>new m),b=(null==n||null==(h=n[0])?void 0:h.length)===4?4:3,S=r.useMemo(()=>{let i=c?new u:new P,r=e.map(e=>{let t=Array.isArray(e);return e instanceof s.Vector3||e instanceof s.Vector4?[e.x,e.y,e.z]:e instanceof s.Vector2?[e.x,e.y,0]:t&&3===e.length?[e[0],e[1],e[2]]:t&&2===e.length?[e[0],e[1],0]:e});if(i.setPositions(r.flat()),n){t=0xffffff;let e=n.map(e=>e instanceof s.Color?e.toArray():e);i.setColors(e.flat(),b)}return i},[e,c,n,b]);return r.useLayoutEffect(()=>{y.computeLineDistances()},[e,y]),r.useLayoutEffect(()=>{d?g.defines.USE_DASH="":delete g.defines.USE_DASH,g.needsUpdate=!0},[d,g]),r.useEffect(()=>()=>{S.dispose(),g.dispose()},[S]),r.createElement("primitive",(0,i.default)({object:y,ref:p},f),r.createElement("primitive",{object:S,attach:"geometry"}),r.createElement("primitive",(0,i.default)({object:g,attach:"material",color:t,vertexColors:!!n,resolution:[v.width,v.height],linewidth:null!=(x=null!=o?o:l)?x:1,dashed:d,transparent:4===b},f)))});e.s(["Line",()=>T],133137)},919316,e=>{"use strict";let t,n;var i=e.i(251474),r=e.i(800592),s=e.i(576678),a=e.i(150401),o=e.i(293741),l=e.i(133137),c=e.i(354901),d=e.i(326164),u=e.i(780406),f=e.i(671948),p=e.i(7338);let h=new p.Vector3,m=new p.Vector3,x=new p.Vector3,v=new p.Vector2;function y(e,t,n){let i=h.setFromMatrixPosition(e.matrixWorld);i.project(t);let r=n.width/2,s=n.height/2;return[i.x*r+r,-(i.y*s)+s]}let g=e=>1e-10>Math.abs(e)?0:e;function b(e,t,n=""){let i="matrix3d(";for(let n=0;16!==n;n++)i+=g(t[n]*e.elements[n])+(15!==n?",":")");return n+i}let S=(t=[1,-1,1,1,1,-1,1,1,1,-1,1,1,1,-1,1,1],e=>b(e,t)),w=(n=e=>[1/e,1/e,1/e,1,-1/e,-1/e,-1/e,-1,1/e,1/e,1/e,1,1,1,1,1],(e,t)=>b(e,n(t),"translate(-50%,-50%)")),M=r.forwardRef(({children:e,eps:t=.001,style:n,className:i,prepend:s,center:l,fullscreen:c,portal:d,distanceFactor:b,sprite:M=!1,transform:j=!1,occlude:A,onOcclude:E,castShadow:C,receiveShadow:_,material:L,geometry:z,zIndexRange:R=[0x1000037,0],calculatePosition:P=y,as:U="div",wrapperClass:T,pointerEvents:B="auto",...O},N)=>{let{gl:I,camera:D,scene:k,size:W,raycaster:F,events:V,viewport:H}=(0,o.useThree)(),[$]=r.useState(()=>document.createElement(U)),G=r.useRef(null),q=r.useRef(null),J=r.useRef(0),K=r.useRef([0,0]),X=r.useRef(null),Q=r.useRef(null),Y=(null==d?void 0:d.current)||V.connected||I.domElement.parentNode,Z=r.useRef(null),ee=r.useRef(!1),et=r.useMemo(()=>{var e;return A&&"blending"!==A||Array.isArray(A)&&A.length&&(e=A[0])&&"object"==typeof e&&"current"in e},[A]);r.useLayoutEffect(()=>{let e=I.domElement;A&&"blending"===A?(e.style.zIndex=`${Math.floor(R[0]/2)}`,e.style.position="absolute",e.style.pointerEvents="none"):(e.style.zIndex=null,e.style.position=null,e.style.pointerEvents=null)},[A]),r.useLayoutEffect(()=>{if(q.current){let e=G.current=f.createRoot($);if(k.updateMatrixWorld(),j)$.style.cssText="position:absolute;top:0;left:0;pointer-events:none;overflow:hidden;";else{let e=P(q.current,D,W);$.style.cssText=`position:absolute;top:0;left:0;transform:translate3d(${e[0]}px,${e[1]}px,0);transform-origin:0 0;`}return Y&&(s?Y.prepend($):Y.appendChild($)),()=>{Y&&Y.removeChild($),e.unmount()}}},[Y,j]),r.useLayoutEffect(()=>{T&&($.className=T)},[T]);let en=r.useMemo(()=>j?{position:"absolute",top:0,left:0,width:W.width,height:W.height,transformStyle:"preserve-3d",pointerEvents:"none"}:{position:"absolute",transform:l?"translate3d(-50%,-50%,0)":"none",...c&&{top:-W.height/2,left:-W.width/2,width:W.width,height:W.height},...n},[n,l,c,W,j]),ei=r.useMemo(()=>({position:"absolute",pointerEvents:B}),[B]);r.useLayoutEffect(()=>{var t,s;ee.current=!1,j?null==(t=G.current)||t.render(r.createElement("div",{ref:X,style:en},r.createElement("div",{ref:Q,style:ei},r.createElement("div",{ref:N,className:i,style:n,children:e})))):null==(s=G.current)||s.render(r.createElement("div",{ref:N,style:en,className:i,children:e}))});let er=r.useRef(!0);(0,a.useFrame)(e=>{if(q.current){D.updateMatrixWorld(),q.current.updateWorldMatrix(!0,!1);let e=j?K.current:P(q.current,D,W);if(j||Math.abs(J.current-D.zoom)>t||Math.abs(K.current[0]-e[0])>t||Math.abs(K.current[1]-e[1])>t){var n;let t,i,r,s,a=(n=q.current,t=h.setFromMatrixPosition(n.matrixWorld),i=m.setFromMatrixPosition(D.matrixWorld),r=t.sub(i),s=D.getWorldDirection(x),r.angleTo(s)>Math.PI/2),o=!1;et&&(Array.isArray(A)?o=A.map(e=>e.current):"blending"!==A&&(o=[k]));let l=er.current;o?er.current=function(e,t,n,i){let r=h.setFromMatrixPosition(e.matrixWorld),s=r.clone();s.project(t),v.set(s.x,s.y),n.setFromCamera(v,t);let a=n.intersectObjects(i,!0);if(a.length){let e=a[0].distance;return r.distanceTo(n.ray.origin)<e}return!0}(q.current,D,F,o)&&!a:er.current=!a,l!==er.current&&(E?E(!er.current):$.style.display=er.current?"block":"none");let c=Math.floor(R[0]/2),d=A?et?[R[0],c]:[c-1,0]:R;if($.style.zIndex=`${function(e,t,n){if(t instanceof p.PerspectiveCamera||t instanceof p.OrthographicCamera){let i=h.setFromMatrixPosition(e.matrixWorld),r=m.setFromMatrixPosition(t.matrixWorld),s=i.distanceTo(r),a=(n[1]-n[0])/(t.far-t.near),o=n[1]-a*t.far;return Math.round(a*s+o)}}(q.current,D,d)}`,j){let[e,t]=[W.width/2,W.height/2],n=D.projectionMatrix.elements[5]*t,{isOrthographicCamera:i,top:r,left:s,bottom:a,right:o}=D,l=S(D.matrixWorldInverse),c=i?`scale(${n})translate(${g(-(o+s)/2)}px,${g((r+a)/2)}px)`:`translateZ(${n}px)`,d=q.current.matrixWorld;M&&((d=D.matrixWorldInverse.clone().transpose().copyPosition(d).scale(q.current.scale)).elements[3]=d.elements[7]=d.elements[11]=0,d.elements[15]=1),$.style.width=W.width+"px",$.style.height=W.height+"px",$.style.perspective=i?"":`${n}px`,X.current&&Q.current&&(X.current.style.transform=`${c}${l}translate(${e}px,${t}px)`,Q.current.style.transform=w(d,1/((b||10)/400)))}else{let t=void 0===b?1:function(e,t){if(t instanceof p.OrthographicCamera)return t.zoom;if(!(t instanceof p.PerspectiveCamera))return 1;{let n=h.setFromMatrixPosition(e.matrixWorld),i=m.setFromMatrixPosition(t.matrixWorld);return 1/(2*Math.tan(t.fov*Math.PI/180/2)*n.distanceTo(i))}}(q.current,D)*b;$.style.transform=`translate3d(${e[0]}px,${e[1]}px,0) scale(${t})`}K.current=e,J.current=D.zoom}}if(!et&&Z.current&&!ee.current)if(j){if(X.current){let e=X.current.children[0];if(null!=e&&e.clientWidth&&null!=e&&e.clientHeight){let{isOrthographicCamera:t}=D;if(t||z)O.scale&&(Array.isArray(O.scale)?O.scale instanceof p.Vector3?Z.current.scale.copy(O.scale.clone().divideScalar(1)):Z.current.scale.set(1/O.scale[0],1/O.scale[1],1/O.scale[2]):Z.current.scale.setScalar(1/O.scale));else{let t=(b||10)/400,n=e.clientWidth*t,i=e.clientHeight*t;Z.current.scale.set(n,i,1)}ee.current=!0}}}else{let t=$.children[0];if(null!=t&&t.clientWidth&&null!=t&&t.clientHeight){let e=1/H.factor,n=t.clientWidth*e,i=t.clientHeight*e;Z.current.scale.set(n,i,1),ee.current=!0}Z.current.lookAt(e.camera.position)}});let es=r.useMemo(()=>({vertexShader:j?void 0:`
          /*
            This shader is from the THREE's SpriteMaterial.
            We need to turn the backing plane into a Sprite
            (make it always face the camera) if "transfrom"
            is false.
          */
          #include <common>

          void main() {
            vec2 center = vec2(0., 1.);
            float rotation = 0.0;

            // This is somewhat arbitrary, but it seems to work well
            // Need to figure out how to derive this dynamically if it even matters
            float size = 0.03;

            vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
            vec2 scale;
            scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
            scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );

            bool isPerspective = isPerspectiveMatrix( projectionMatrix );
            if ( isPerspective ) scale *= - mvPosition.z;

            vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale * size;
            vec2 rotatedPosition;
            rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
            rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
            mvPosition.xy += rotatedPosition;

            gl_Position = projectionMatrix * mvPosition;
          }
      `,fragmentShader:`
        void main() {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        }
      `}),[j]);return r.createElement("group",(0,u.default)({},O,{ref:q}),A&&!et&&r.createElement("mesh",{castShadow:C,receiveShadow:_,ref:Z},z||r.createElement("planeGeometry",null),L||r.createElement("shaderMaterial",{side:p.DoubleSide,vertexShader:es.vertexShader,fragmentShader:es.fragmentShader})))});var j=e.i(415160);async function A(e){if(0===e.length)return[];let t=await fetch("/api/admin/geolocation",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({ips:e.map(e=>e.ip)}),signal:AbortSignal.timeout(3e4)});if(!t.ok)throw Error(`Geolocation API error: ${t.status}`);let n=(await t.json()).results||{};return e.map(e=>{let t,i,r=n[e.ip],s=!r||"Unknown"===r.city||e.ip.startsWith("127.")||e.ip.startsWith("192.168.")||e.ip.startsWith("10.");return{userId:e.id,ip:e.ip,coordinates:r||{lat:(i=(t=[{latRange:[25,49],lonRange:[-125,-70],country:"United States"},{latRange:[36,71],lonRange:[-10,40],country:"Germany"},{latRange:[35,60],lonRange:[-10,10],country:"United Kingdom"},{latRange:[10,55],lonRange:[70,140],country:"China"},{latRange:[20,46],lonRange:[122,146],country:"Japan"},{latRange:[-35,10],lonRange:[-80,-35],country:"Brazil"},{latRange:[-35,35],lonRange:[-20,50],country:"South Africa"},{latRange:[-40,-10],lonRange:[110,180],country:"Australia"}])[Math.floor(Math.random()*t.length)]).latRange[0]+Math.random()*(i.latRange[1]-i.latRange[0]),lon:i.lonRange[0]+Math.random()*(i.lonRange[1]-i.lonRange[0]),city:"Unknown",country:i.country},isMock:s}})}function E(e,t,n){let i=Math.PI/180*(90-e),r=Math.PI/180*(t+180),s=-(n*Math.sin(i)*Math.cos(r)),a=n*Math.sin(i)*Math.sin(r);return{x:s,y:n*Math.cos(i),z:a}}var C=e.i(383918),_=e.i(143794),L=e.i(167604),z=e.i(84640);let R="#4FD1C5",P="#3A7CFF",U="#5eead4",T="#38bdf8",B=["#4FD1C5","#3A7CFF","#8b5cf6","#f59e0b","#10b981"];function O(){let e=(0,r.useRef)(null);(0,a.useFrame)(()=>{if(!e.current)return;let t=new Date,n=(t.getUTCHours()+t.getUTCMinutes()/60)/24*Math.PI*2;e.current.rotation.y=n});let t=(0,r.useMemo)(()=>{let e=document.createElement("canvas");e.width=256,e.height=1;let t=e.getContext("2d"),n=t.createLinearGradient(0,0,256,0);n.addColorStop(0,"rgba(0,0,0,0.6)"),n.addColorStop(.3,"rgba(0,0,0,0.3)"),n.addColorStop(.5,"rgba(0,0,0,0)"),n.addColorStop(.7,"rgba(0,0,0,0.3)"),n.addColorStop(1,"rgba(0,0,0,0.6)"),t.fillStyle=n,t.fillRect(0,0,256,1);let i=new p.CanvasTexture(e);return i.wrapS=p.RepeatWrapping,i.wrapT=p.RepeatWrapping,i},[]);return(0,i.jsxs)("mesh",{ref:e,children:[(0,i.jsx)("sphereGeometry",{args:[2.22,64,64]}),(0,i.jsx)("meshBasicMaterial",{map:t,transparent:!0,opacity:.4,blending:p.MultiplyBlending})]})}function N({cluster:e,onClick:t,cameraDistance:n}){let s=(0,r.useRef)(null),o=e.users.length,l=B[e.id.charCodeAt(0)%B.length],c=Math.min(.15,.08+.01*o)*Math.min(1,n/6);return(0,a.useFrame)(({clock:e})=>{if(s.current){let t=(Math.sin(2*e.getElapsedTime())+1)/2;s.current.scale.setScalar(c*(1+.1*t))}}),(0,i.jsxs)("group",{position:e.position,children:[(0,i.jsxs)("mesh",{ref:s,onClick:t,children:[(0,i.jsx)("sphereGeometry",{args:[1,16,16]}),(0,i.jsx)("meshStandardMaterial",{color:l,emissive:l,emissiveIntensity:.5})]}),(0,i.jsx)(M,{distanceFactor:10,children:(0,i.jsxs)("div",{className:"flex flex-col items-center pointer-events-none",children:[(0,i.jsx)("div",{className:"px-2 py-0.5 rounded-full text-xs font-bold text-white whitespace-nowrap",style:{backgroundColor:l},children:o}),(0,i.jsxs)("span",{className:"text-[10px] text-white/70 mt-0.5",children:[e.users.filter(e=>"TUTOR"===e.role).length,"T · ",e.users.filter(e=>"STUDENT"===e.role).length,"S"]})]})})]})}function I({user:e,onHover:t,onLeave:n,cameraDistance:s}){let o=(0,r.useRef)(null),l=(0,r.useRef)(null),c="TUTOR"===e.role?R:P,d=("TUTOR"===e.role?.08:.062)*Math.min(1,s/6);return(0,a.useFrame)(({clock:t})=>{if(l.current&&e.isActive){let e=(Math.sin(3*t.getElapsedTime())+1)/2;l.current.scale.setScalar(1+.3*e);let n=l.current.material;n&&"number"==typeof n.opacity&&(n.opacity=.14+.22*e)}}),(0,i.jsxs)("group",{position:e.position,children:[(0,i.jsxs)("mesh",{ref:o,scale:[d,d,d],onPointerOver:n=>{n.stopPropagation(),t(e,n.clientX,n.clientY)},onPointerMove:n=>{t(e,n.clientX,n.clientY)},onPointerOut:n,children:[(0,i.jsx)("sphereGeometry",{args:[1,16,16]}),(0,i.jsx)("meshStandardMaterial",{color:c,emissive:c,emissiveIntensity:e.isActive?1.12:.55})]}),e.isActive&&(0,i.jsxs)("mesh",{ref:l,scale:[2.4*d,2.4*d,2.4*d],children:[(0,i.jsx)("sphereGeometry",{args:[1,12,12]}),(0,i.jsx)("meshBasicMaterial",{color:c,transparent:!0,opacity:.25})]}),e.isMock&&(0,i.jsxs)("mesh",{position:[1.5*d,1.5*d,0],scale:[.3*d,.3*d,.3*d],children:[(0,i.jsx)("sphereGeometry",{args:[1,8,8]}),(0,i.jsx)("meshBasicMaterial",{color:"#fbbf24"})]}),e.isActive&&(0,i.jsx)(M,{distanceFactor:10,children:(0,i.jsxs)("div",{className:"px-2 py-1 rounded text-xs font-semibold whitespace-nowrap pointer-events-none",style:{backgroundColor:`${c}40`,color:c,border:`1px solid ${c}80`,transform:"translate(-50%, -150%)"},children:[e.name,e.isMock&&(0,i.jsx)("span",{className:"ml-1 text-[10px] opacity-70",title:"Estimated location",children:"*"})]})})]})}function D({session:e,pulse:t,cameraDistance:n,isVisible:s}){let o=(0,r.useRef)(null),c=(0,r.useRef)(null),d=(0,r.useMemo)(()=>{var t,n,i;let r;return s?(t=e.tutorPos,n=e.studentPos,i=e.isActive,(r=new p.Vector3().addVectors(t,n).multiplyScalar(.5)).normalize().multiplyScalar(2.2*(i?1.45:1.28)),new p.QuadraticBezierCurve3(t,r,n).getPoints(50)):[]},[e,s]),u=(0,r.useMemo)(()=>s&&0!==d.length?new p.CatmullRomCurve3(d):null,[d,s]);(0,a.useFrame)(({clock:t})=>{if(!c.current||!e.isActive||!u||!s||Math.floor(60*t.elapsedTime)%(n>7?2:1)!=0)return;let i=t.getElapsedTime(),r=c.current.geometry.attributes.position.array;for(let e=0;e<5;e++){let t=(.5*i+.2*e)%1,n=u.getPoint(t);r[3*e]=n.x,r[3*e+1]=n.y,r[3*e+2]=n.z}c.current.geometry.attributes.position.needsUpdate=!0});let f=(0,r.useMemo)(()=>{let e=new p.BufferGeometry,t=new Float32Array(15);return e.setAttribute("position",new p.BufferAttribute(t,3)),e},[]);if(!s||n>8)return(0,i.jsx)(l.Line,{points:[e.tutorPos,e.studentPos],color:e.isActive?U:T,transparent:!0,opacity:.1,lineWidth:.5});let h=e.isActive;return(0,i.jsxs)("group",{children:[(0,i.jsx)(l.Line,{ref:o,points:d,color:e.isActive?U:T,transparent:!0,opacity:e.isActive?.45+.45*t:h?.35:.2,lineWidth:e.isActive?h?3:2.4:h?1.5:.95}),e.isActive&&n<7&&(0,i.jsx)(l.Line,{points:d,color:"#86efac",transparent:!0,opacity:.2+.25*t,lineWidth:h?4.4:4}),e.isActive&&n<6&&(0,i.jsx)("points",{ref:c,geometry:f,children:(0,i.jsx)("pointsMaterial",{color:"#ffffff",size:.05,transparent:!0,opacity:.8,sizeAttenuation:!0})})]})}function k(){let e=(0,r.useMemo)(()=>{let e=[];for(let t=0;t<2600;t+=1){let t=18+18*Math.random(),n=Math.random()*Math.PI*2,i=Math.acos(2*Math.random()-1);e.push(t*Math.sin(i)*Math.cos(n),t*Math.cos(i),t*Math.sin(i)*Math.sin(n))}return new Float32Array(e)},[]),t=(0,r.useMemo)(()=>{let t=new p.BufferGeometry;return t.setAttribute("position",new p.Float32BufferAttribute(e,3)),t},[e]);return(0,i.jsx)("points",{geometry:t,children:(0,i.jsx)("pointsMaterial",{color:"#dbeafe",size:.085,sizeAttenuation:!0,transparent:!0,opacity:.95})})}function W(){return(0,i.jsxs)("group",{children:[(0,i.jsx)(d.Sphere,{args:[6.8,32,32],position:[-10,2,-25],children:(0,i.jsx)("meshBasicMaterial",{color:"#2563eb",transparent:!0,opacity:.08})}),(0,i.jsx)(d.Sphere,{args:[5.6,32,32],position:[12,-3,-22],children:(0,i.jsx)("meshBasicMaterial",{color:"#8b5cf6",transparent:!0,opacity:.08})}),(0,i.jsx)(d.Sphere,{args:[4.2,32,32],position:[0,10,-21],children:(0,i.jsx)("meshBasicMaterial",{color:"#0891b2",transparent:!0,opacity:.08})})]})}function F({users:e,sessions:t,autoRotate:n,onAutoRotateChange:s,onStatsUpdate:l,onUserHover:u}){let[f,h]=(0,r.useState)(0),[m,x]=(0,r.useState)([]),[v,y]=(0,r.useState)([]),[g,b]=(0,r.useState)(null),[S,w]=(0,r.useState)(!1),[M,C]=(0,r.useState)([]),[_,L]=(0,r.useState)(null),z=(0,r.useRef)(null),R=(0,r.useRef)([]),P=(0,r.useRef)([]),{camera:U}=(0,o.useThree)(),[T,B]=(0,r.useState)(6.3);(0,a.useFrame)(()=>{let e=U.position.distanceTo(new p.Vector3(0,0,0));B(e),w(t=>!t&&e>7.5||(!t||!(e<6.5))&&t)});let{data:F,isLoading:V}=function(e,t={}){let{enabled:n=!0,staleTime:i=18e5}=t,r=["geolocation","batch",e.map(e=>`${e.id}:${e.ip}`).sort().join(",")];return(0,j.useQuery)({queryKey:r,queryFn:()=>A(e),enabled:n&&e.length>0,staleTime:i,gcTime:36e5,retry:2,retryDelay:e=>Math.min(1e3*2**e,3e4)})}(e);(0,r.useEffect)(()=>{let t=F||z.current;if(!t)return;F&&(z.current=F);let n=[],i=0,r=0;for(let s of t){let t=e.find(e=>e.id===s.userId);if(!t)continue;let a=E(s.coordinates.lat,s.coordinates.lon,2.23);n.push({...t,position:new p.Vector3(a.x,a.y,a.z),coordinates:s.coordinates,isMock:s.isMock}),s.isMock?i++:r++}x(n),R.current=n,l?.({mockCount:i,realCount:r}),C(function(e,t=15){let n=[],i=new Set;for(let r of e){if(i.has(r.id))continue;let s=[r];for(let n of(i.add(r.id),e)){if(i.has(n.id))continue;let e=Math.abs(r.coordinates.lat-n.coordinates.lat),a=Math.abs(r.coordinates.lon-n.coordinates.lon);e<t&&a<t&&(s.push(n),i.add(n.id))}let a=s.reduce((e,t)=>e+t.coordinates.lat,0)/s.length,o=s.reduce((e,t)=>e+t.coordinates.lon,0)/s.length,l=E(a,o,2.25);n.push({id:`cluster-${r.id}`,position:new p.Vector3(l.x,l.y,l.z),users:s,centerLat:a,centerLon:o})}return n}(n))},[F,e,l]),(0,r.useEffect)(()=>{let e=m.length>0?m:R.current,n=[];for(let i of t){let t=e.find(e=>e.id===i.tutorId),r=e.find(e=>e.id===i.studentId);t&&r&&n.push({...i,tutorPos:t.position,studentPos:r.position})}y(e=>{let t=new Map(n.map(e=>[e.id,e])),i=new Map(e.map(e=>[e.id,e])),r=[];for(let e of new Set([...i.keys(),...t.keys()])){let n=t.get(e),s=i.get(e);n?r.push(n):s&&r.push(s)}return r}),P.current=n},[t,m]),(0,a.useFrame)(({clock:e})=>{h((Math.sin(3.1*e.getElapsedTime())+1)/2)});let H=(0,r.useCallback)((e,t,n)=>{b({user:e,x:t,y:n}),u?.({user:e,x:t,y:n})},[u]),$=(0,r.useCallback)(()=>{b(null),u?.(null)},[u]),G=(0,r.useMemo)(()=>[...v].sort((e,t)=>e.isActive&&!t.isActive?-1:!e.isActive&&t.isActive?1:e.id.localeCompare(t.id)).slice(0,T>8?30:T>6?50:75),[v,T]),q=(0,r.useMemo)(()=>S&&!_?[]:_?_.users:m,[S,_,m]);return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("ambientLight",{intensity:.45}),(0,i.jsx)("pointLight",{position:[6,4,8],intensity:1.3,color:"#8be9ff"}),(0,i.jsx)("pointLight",{position:[-8,-4,-6],intensity:.55,color:"#60a5fa"}),(0,i.jsx)(k,{}),(0,i.jsx)(W,{}),(0,i.jsx)(O,{}),(0,i.jsx)(d.Sphere,{args:[2.24,96,96],children:(0,i.jsx)("meshBasicMaterial",{color:"#67e8f9",wireframe:!0,transparent:!0,opacity:.22})}),(0,i.jsx)(d.Sphere,{args:[2.2+.08,64,64],children:(0,i.jsx)("meshBasicMaterial",{color:"#67e8f9",transparent:!0,opacity:.11})}),(0,i.jsx)(d.Sphere,{args:[2.2,96,96],children:(0,i.jsx)("meshStandardMaterial",{color:"#0c2a43",emissive:"#0b3b5e",emissiveIntensity:.36,metalness:.2,roughness:.52})}),G.map(e=>(0,i.jsx)(D,{session:e,pulse:f,cameraDistance:T,isVisible:!S},e.id)),S&&!_&&M.map(e=>(0,i.jsx)(N,{cluster:e,onClick:()=>L(e),cameraDistance:T},e.id)),(!S||_)&&q.map(e=>(0,i.jsx)(I,{user:e,onHover:H,onLeave:$,cameraDistance:T},e.id)),(0,i.jsx)(c.OrbitControls,{enablePan:!1,minDistance:4.2,maxDistance:9,autoRotate:n,autoRotateSpeed:.45,onChange:()=>L(null),onStart:()=>s(!1)})]})}function V({mockCount:e,realCount:t,isLoading:n}){let r=e+t,s=r>0?Math.round(t/r*100):0;return(0,i.jsxs)("div",{className:"absolute top-4 left-4 z-50 bg-slate-900/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-slate-700",children:[(0,i.jsx)("div",{className:"flex items-center gap-2 text-xs",children:n?(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(C.Loader2,{className:"w-3 h-3 animate-spin text-cyan-400"}),(0,i.jsx)("span",{className:"text-slate-300",children:"Locating users..."})]}):(0,i.jsxs)(i.Fragment,{children:[t>0?(0,i.jsx)(L.Wifi,{className:"w-3 h-3 text-green-400"}):(0,i.jsx)(z.WifiOff,{className:"w-3 h-3 text-amber-400"}),(0,i.jsxs)("span",{className:"text-slate-300",children:[s,"% real location"]}),e>0&&(0,i.jsxs)("span",{className:"text-amber-400/70 text-[10px]",children:["(",e," estimated)"]})]})}),(0,i.jsx)("div",{className:"mt-1 h-1 w-24 bg-slate-700 rounded-full overflow-hidden",children:(0,i.jsx)("div",{className:"h-full bg-gradient-to-r from-green-400 to-cyan-400 transition-all duration-500",style:{width:`${s}%`}})})]})}function H({user:e,x:t,y:n,sessions:r}){let s="TUTOR"===e.role?R:P,a=r.filter(t=>("TUTOR"===e.role?t.tutorId:t.studentId)===e.id&&t.isActive);return(0,i.jsx)("div",{className:"fixed z-50 pointer-events-none",style:{left:t+15,top:n-15},children:(0,i.jsxs)("div",{className:"bg-slate-900/95 backdrop-blur-md rounded-lg px-4 py-3 border shadow-2xl min-w-[200px]",style:{borderColor:`${s}50`},children:[(0,i.jsxs)("div",{className:"flex items-center gap-2 mb-2",children:[(0,i.jsx)("div",{className:"w-2 h-2 rounded-full",style:{backgroundColor:s}}),(0,i.jsx)("span",{className:"font-semibold text-white text-sm",children:e.name}),(0,i.jsx)("span",{className:"text-[10px] px-1.5 py-0.5 rounded",style:{backgroundColor:`${s}30`,color:s},children:e.role})]}),(0,i.jsxs)("div",{className:"space-y-1 text-xs text-slate-400",children:[(0,i.jsxs)("div",{className:"flex items-center gap-1.5",children:[(0,i.jsx)(_.MapPin,{className:"w-3 h-3"}),(0,i.jsx)("span",{children:"Unknown"!==e.coordinates.city?`${e.coordinates.city}, ${e.coordinates.country}`:e.coordinates.country}),e.isMock&&(0,i.jsx)("span",{className:"text-amber-400/70",title:"Estimated location",children:"(est.)"})]}),(0,i.jsxs)("div",{className:"flex items-center gap-1.5",children:[(0,i.jsx)("span",{className:"text-slate-500",children:"Lat:"}),(0,i.jsxs)("span",{children:[e.coordinates.lat.toFixed(2),"°"]}),(0,i.jsx)("span",{className:"text-slate-500 ml-2",children:"Lon:"}),(0,i.jsxs)("span",{children:[e.coordinates.lon.toFixed(2),"°"]})]}),a.length>0&&(0,i.jsxs)("div",{className:"pt-2 mt-2 border-t border-slate-700",children:[(0,i.jsx)("span",{className:"text-green-400",children:"●"}),(0,i.jsxs)("span",{className:"ml-1.5",children:[a.length," active session",a.length>1?"s":""]}),a.map(e=>(0,i.jsx)("div",{className:"ml-4 text-slate-500",children:e.subject},e.id))]})]})]})})}function $({users:e,sessions:t,className:n,autoRotate:a=!0,onAutoRotateChange:o}){let l=(0,r.useRef)(null),[c,d]=(0,r.useState)({mockCount:0,realCount:0}),[u,f]=(0,r.useState)(!0),[p,h]=(0,r.useState)(null);return(0,i.jsxs)("div",{ref:l,className:`absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_22%_18%,#14235f_0%,#05081d_42%,#020617_86%)] ${n}`,children:[(0,i.jsx)(V,{mockCount:c.mockCount,realCount:c.realCount,isLoading:u}),p&&(0,i.jsx)(H,{user:p.user,x:p.x,y:p.y,sessions:t}),(0,i.jsxs)(s.Canvas,{camera:{position:[0,0,6.3],fov:46},dpr:[1,1.8],style:{position:"absolute",top:0,left:0,width:"100%",height:"100%"},children:[(0,i.jsx)("color",{attach:"background",args:["#020617"]}),(0,i.jsx)(F,{users:e,sessions:t,autoRotate:a,onAutoRotateChange:o||(()=>{}),onStatsUpdate:e=>{d(e),f(!1)},onUserHover:h})]})]})}e.s(["default",()=>$],919316)},652965,e=>{e.n(e.i(919316))}]);

//# debugId=1cbb92d3-4e1b-e544-d89b-6a9441fe75f6
//# sourceMappingURL=f590a9e8a1604d0f.js.map