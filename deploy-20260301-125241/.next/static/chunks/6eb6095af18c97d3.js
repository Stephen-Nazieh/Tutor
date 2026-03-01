;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="b1dfe3ca-24eb-e525-9c2a-bf5eb17be7fc")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,50654,(e,t,i)=>{"use strict";var n=e.r(800592),r=e.r(90550),s="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},a=r.useSyncExternalStore,o=n.useRef,l=n.useEffect,c=n.useMemo,d=n.useDebugValue;i.useSyncExternalStoreWithSelector=function(e,t,i,n,r){var u=o(null);if(null===u.current){var f={hasValue:!1,value:null};u.current=f}else f=u.current;var p=a(e,(u=c(function(){function e(e){if(!l){if(l=!0,a=e,e=n(e),void 0!==r&&f.hasValue){var t=f.value;if(r(t,e))return o=t}return o=e}if(t=o,s(a,e))return t;var i=n(e);return void 0!==r&&r(t,i)?(a=e,t):(a=e,o=i)}var a,o,l=!1,c=void 0===i?null:i;return[function(){return e(t())},null===c?void 0:function(){return e(c())}]},[t,i,n,r]))[0],u[1]);return l(function(){f.hasValue=!0,f.value=p},[p]),d(p),p}},694542,(e,t,i)=>{"use strict";t.exports=e.r(50654)},780406,e=>{"use strict";function t(){return(t=Object.assign.bind()).apply(null,arguments)}e.s(["default",()=>t])},214371,e=>{"use strict";let t=e=>{let t,i=new Set,n=(e,n)=>{let r="function"==typeof e?e(t):e;if(!Object.is(r,t)){let e=t;t=(null!=n?n:"object"!=typeof r||null===r)?r:Object.assign({},t,r),i.forEach(i=>i(t,e))}},r=()=>t,s={setState:n,getState:r,getInitialState:()=>a,subscribe:e=>(i.add(e),()=>i.delete(e))},a=t=e(n,r,s);return s},i=e=>e?t(e):t;e.s(["createStore",()=>i])},133137,e=>{"use strict";let t,i;var n=e.i(780406),r=e.i(800592),s=e.i(7338),a=e.i(293741),o=s,l=s;let c=new l.Box3,d=new l.Vector3;class u extends l.InstancedBufferGeometry{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry",this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute("position",new l.Float32BufferAttribute([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute("uv",new l.Float32BufferAttribute([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,i=this.attributes.instanceEnd;return void 0!==t&&(t.applyMatrix4(e),i.applyMatrix4(e),t.needsUpdate=!0),null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let i=new l.InstancedInterleavedBuffer(t,6,1);return this.setAttribute("instanceStart",new l.InterleavedBufferAttribute(i,3,0)),this.setAttribute("instanceEnd",new l.InterleavedBufferAttribute(i,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let i;e instanceof Float32Array?i=e:Array.isArray(e)&&(i=new Float32Array(e));let n=new l.InstancedInterleavedBuffer(i,2*t,1);return this.setAttribute("instanceColorStart",new l.InterleavedBufferAttribute(n,t,0)),this.setAttribute("instanceColorEnd",new l.InterleavedBufferAttribute(n,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new l.WireframeGeometry(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){null===this.boundingBox&&(this.boundingBox=new l.Box3);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;void 0!==e&&void 0!==t&&(this.boundingBox.setFromBufferAttribute(e),c.setFromBufferAttribute(t),this.boundingBox.union(c))}computeBoundingSphere(){null===this.boundingSphere&&(this.boundingSphere=new l.Sphere),null===this.boundingBox&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(void 0!==e&&void 0!==t){let i=this.boundingSphere.center;this.boundingBox.getCenter(i);let n=0;for(let r=0,s=e.count;r<s;r++)d.fromBufferAttribute(e,r),n=Math.max(n,i.distanceToSquared(d)),d.fromBufferAttribute(t,r),n=Math.max(n,i.distanceToSquared(d));this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}var f=s,p=e.i(149153);let h=parseInt(s.REVISION.replace(/\D+/g,""));class m extends f.ShaderMaterial{constructor(e){super({type:"LineMaterial",uniforms:f.UniformsUtils.clone(f.UniformsUtils.merge([p.UniformsLib.common,p.UniformsLib.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new f.Vector2(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
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
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(e){this.uniforms.diffuse.value=e}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(e){!0===e?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(e){this.uniforms.linewidth.value=e}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(e){!!e!="USE_DASH"in this.defines&&(this.needsUpdate=!0),!0===e?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(e){this.uniforms.dashScale.value=e}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(e){this.uniforms.dashSize.value=e}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(e){this.uniforms.dashOffset.value=e}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(e){this.uniforms.gapSize.value=e}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(e){this.uniforms.opacity.value=e}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(e){this.uniforms.resolution.value.copy(e)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(e){!!e!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),!0===e?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}}let v=h>=125?"uv1":"uv2",x=new o.Vector4,y=new o.Vector3,g=new o.Vector3,b=new o.Vector4,S=new o.Vector4,w=new o.Vector4,M=new o.Vector3,A=new o.Matrix4,E=new o.Line3,_=new o.Vector3,j=new o.Box3,L=new o.Sphere,U=new o.Vector4;function z(e,t,n){return U.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),U.multiplyScalar(1/U.w),U.x=i/n.width,U.y=i/n.height,U.applyMatrix4(e.projectionMatrixInverse),U.multiplyScalar(1/U.w),Math.abs(Math.max(U.x,U.y))}class B extends o.Mesh{constructor(e=new u,t=new m({color:0xffffff*Math.random()})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,i=e.attributes.instanceEnd,n=new Float32Array(2*t.count);for(let e=0,r=0,s=t.count;e<s;e++,r+=2)y.fromBufferAttribute(t,e),g.fromBufferAttribute(i,e),n[r]=0===r?0:n[r-1],n[r+1]=n[r]+y.distanceTo(g);let r=new o.InstancedInterleavedBuffer(n,2,1);return e.setAttribute("instanceDistanceStart",new o.InterleavedBufferAttribute(r,1,0)),e.setAttribute("instanceDistanceEnd",new o.InterleavedBufferAttribute(r,1,1)),this}raycast(e,n){let r,s,a=this.material.worldUnits,l=e.camera;null!==l||a||console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');let c=void 0!==e.params.Line2&&e.params.Line2.threshold||0;t=e.ray;let d=this.matrixWorld,u=this.geometry,f=this.material;if(i=f.linewidth+c,null===u.boundingSphere&&u.computeBoundingSphere(),L.copy(u.boundingSphere).applyMatrix4(d),a)r=.5*i;else{let e=Math.max(l.near,L.distanceToPoint(t.origin));r=z(l,e,f.resolution)}if(L.radius+=r,!1!==t.intersectsSphere(L)){if(null===u.boundingBox&&u.computeBoundingBox(),j.copy(u.boundingBox).applyMatrix4(d),a)s=.5*i;else{let e=Math.max(l.near,j.distanceToPoint(t.origin));s=z(l,e,f.resolution)}j.expandByScalar(s),!1!==t.intersectsBox(j)&&(a?function(e,n){let r=e.matrixWorld,s=e.geometry,a=s.attributes.instanceStart,l=s.attributes.instanceEnd,c=Math.min(s.instanceCount,a.count);for(let s=0;s<c;s++){E.start.fromBufferAttribute(a,s),E.end.fromBufferAttribute(l,s),E.applyMatrix4(r);let c=new o.Vector3,d=new o.Vector3;t.distanceSqToSegment(E.start,E.end,d,c),d.distanceTo(c)<.5*i&&n.push({point:d,pointOnLine:c,distance:t.origin.distanceTo(d),object:e,face:null,faceIndex:s,uv:null,[v]:null})}}(this,n):function(e,n,r){let s=n.projectionMatrix,a=e.material.resolution,l=e.matrixWorld,c=e.geometry,d=c.attributes.instanceStart,u=c.attributes.instanceEnd,f=Math.min(c.instanceCount,d.count),p=-n.near;t.at(1,w),w.w=1,w.applyMatrix4(n.matrixWorldInverse),w.applyMatrix4(s),w.multiplyScalar(1/w.w),w.x*=a.x/2,w.y*=a.y/2,w.z=0,M.copy(w),A.multiplyMatrices(n.matrixWorldInverse,l);for(let n=0;n<f;n++){if(b.fromBufferAttribute(d,n),S.fromBufferAttribute(u,n),b.w=1,S.w=1,b.applyMatrix4(A),S.applyMatrix4(A),b.z>p&&S.z>p)continue;if(b.z>p){let e=b.z-S.z,t=(b.z-p)/e;b.lerp(S,t)}else if(S.z>p){let e=S.z-b.z,t=(S.z-p)/e;S.lerp(b,t)}b.applyMatrix4(s),S.applyMatrix4(s),b.multiplyScalar(1/b.w),S.multiplyScalar(1/S.w),b.x*=a.x/2,b.y*=a.y/2,S.x*=a.x/2,S.y*=a.y/2,E.start.copy(b),E.start.z=0,E.end.copy(S),E.end.z=0;let c=E.closestPointToPointParameter(M,!0);E.at(c,_);let f=o.MathUtils.lerp(b.z,S.z,c),h=f>=-1&&f<=1,m=M.distanceTo(_)<.5*i;if(h&&m){E.start.fromBufferAttribute(d,n),E.end.fromBufferAttribute(u,n),E.start.applyMatrix4(l),E.end.applyMatrix4(l);let i=new o.Vector3,s=new o.Vector3;t.distanceSqToSegment(E.start,E.end,s,i),r.push({point:s,pointOnLine:i,distance:t.origin.distanceTo(s),object:e,face:null,faceIndex:n,uv:null,[v]:null})}}}(this,l,n))}}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(x),this.material.uniforms.resolution.value.set(x.z,x.w))}}class O extends u{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){let t=e.length-3,i=new Float32Array(2*t);for(let n=0;n<t;n+=3)i[2*n]=e[n],i[2*n+1]=e[n+1],i[2*n+2]=e[n+2],i[2*n+3]=e[n+3],i[2*n+4]=e[n+4],i[2*n+5]=e[n+5];return super.setPositions(i),this}setColors(e,t=3){let i=e.length-t,n=new Float32Array(2*i);if(3===t)for(let r=0;r<i;r+=t)n[2*r]=e[r],n[2*r+1]=e[r+1],n[2*r+2]=e[r+2],n[2*r+3]=e[r+3],n[2*r+4]=e[r+4],n[2*r+5]=e[r+5];else for(let r=0;r<i;r+=t)n[2*r]=e[r],n[2*r+1]=e[r+1],n[2*r+2]=e[r+2],n[2*r+3]=e[r+3],n[2*r+4]=e[r+4],n[2*r+5]=e[r+5],n[2*r+6]=e[r+6],n[2*r+7]=e[r+7];return super.setColors(n,t),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class I extends B{constructor(e=new O,t=new m({color:0xffffff*Math.random()})){super(e,t),this.isLine2=!0,this.type="Line2"}}let C=r.forwardRef(function({points:e,color:t=0xffffff,vertexColors:i,linewidth:o,lineWidth:l,segments:c,dashed:d,...f},p){var h,v;let x=(0,a.useThree)(e=>e.size),y=r.useMemo(()=>c?new B:new I,[c]),[g]=r.useState(()=>new m),b=(null==i||null==(h=i[0])?void 0:h.length)===4?4:3,S=r.useMemo(()=>{let n=c?new u:new O,r=e.map(e=>{let t=Array.isArray(e);return e instanceof s.Vector3||e instanceof s.Vector4?[e.x,e.y,e.z]:e instanceof s.Vector2?[e.x,e.y,0]:t&&3===e.length?[e[0],e[1],e[2]]:t&&2===e.length?[e[0],e[1],0]:e});if(n.setPositions(r.flat()),i){t=0xffffff;let e=i.map(e=>e instanceof s.Color?e.toArray():e);n.setColors(e.flat(),b)}return n},[e,c,i,b]);return r.useLayoutEffect(()=>{y.computeLineDistances()},[e,y]),r.useLayoutEffect(()=>{d?g.defines.USE_DASH="":delete g.defines.USE_DASH,g.needsUpdate=!0},[d,g]),r.useEffect(()=>()=>{S.dispose(),g.dispose()},[S]),r.createElement("primitive",(0,n.default)({object:y,ref:p},f),r.createElement("primitive",{object:S,attach:"geometry"}),r.createElement("primitive",(0,n.default)({object:g,attach:"material",color:t,vertexColors:!!i,resolution:[x.width,x.height],linewidth:null!=(v=null!=o?o:l)?v:1,dashed:d,transparent:4===b},f)))});e.s(["Line",()=>C],133137)},915975,e=>{"use strict";var t=e.i(251474),i=e.i(800592),n=e.i(576678),r=e.i(133137),s=e.i(354901),a=e.i(326164),o=e.i(7338);let l=[[[72,-165],[60,-150],[50,-135],[42,-124],[33,-118],[25,-105],[18,-95],[25,-84],[30,-97],[40,-110],[52,-125],[62,-140],[72,-165]],[[13,-81],[7,-79],[-5,-76],[-15,-70],[-27,-63],[-40,-60],[-53,-68],[-47,-75],[-30,-73],[-16,-65],[-6,-58],[3,-52],[9,-60],[13,-70],[13,-81]],[[70,-10],[64,8],[58,25],[50,32],[43,25],[38,10],[35,-2],[38,-10],[46,-8],[55,-4],[64,-6],[70,-10]],[[35,-17],[22,-15],[10,-10],[0,7],[-10,20],[-20,30],[-30,30],[-34,18],[-30,8],[-20,-2],[-5,-10],[10,-16],[22,-18],[35,-17]],[[70,40],[63,60],[55,85],[50,110],[45,125],[35,135],[25,123],[18,110],[10,95],[8,75],[20,58],[33,45],[47,38],[60,35],[70,40]],[[-10,112],[-20,118],[-27,132],[-35,146],[-37,155],[-28,153],[-19,144],[-14,130],[-10,120],[-10,112]]],c=[[[49,-125],[49,-95],[31,-95],[25,-106],[32,-117],[41,-124],[49,-125]],[[53,73],[50,95],[45,112],[35,121],[23,117],[20,102],[29,87],[40,78],[53,73]],[[35,68],[30,76],[24,83],[20,78],[9,76],[8,72],[16,69],[25,70],[35,68]],[[5,-75],[-8,-71],[-16,-60],[-24,-54],[-31,-56],[-28,-62],[-18,-67],[-5,-70],[5,-75]]];function d(e,t,i){let n=Math.PI/180*(90-e),r=Math.PI/180*(t+180),s=-(i*Math.sin(n)*Math.cos(r)),a=i*Math.sin(n)*Math.sin(r),l=i*Math.cos(n);return new o.Vector3(s,l,a)}function u(){let e=(0,i.useMemo)(()=>{let e=[];for(let t=0;t<2600;t+=1){let t=18+18*Math.random(),i=Math.random()*Math.PI*2,n=Math.acos(2*Math.random()-1);e.push(t*Math.sin(n)*Math.cos(i),t*Math.cos(n),t*Math.sin(n)*Math.sin(i))}return new Float32Array(e)},[]),n=(0,i.useMemo)(()=>{let t=new o.BufferGeometry;return t.setAttribute("position",new o.Float32BufferAttribute(e,3)),t},[e]);return(0,t.jsx)("points",{geometry:n,children:(0,t.jsx)("pointsMaterial",{color:"#dbeafe",size:.085,sizeAttenuation:!0,transparent:!0,opacity:.95})})}function f(){let e=(0,i.useMemo)(()=>[[new o.Vector3(-8,7,-12),new o.Vector3(-7.2,6.5,-12.4),new o.Vector3(-6.7,7.1,-12.8),new o.Vector3(-6.1,6.4,-13.3)],[new o.Vector3(8,6,-13),new o.Vector3(7.2,6.7,-13.6),new o.Vector3(6.6,6,-14.2),new o.Vector3(6,5.2,-14.8)],[new o.Vector3(10,-2,-15),new o.Vector3(9.2,-1.2,-15.4),new o.Vector3(8.5,-1.9,-15.9),new o.Vector3(7.9,-2.8,-16.5)]],[]);return(0,t.jsx)("group",{children:e.map((e,i)=>(0,t.jsx)(r.Line,{points:e,color:"#a5b4fc",transparent:!0,opacity:.55,lineWidth:1.6},`constellation-${i}`))})}function p(){return(0,t.jsxs)("group",{children:[(0,t.jsx)(a.Sphere,{args:[1.1,28,28],position:[13,8,-18],children:(0,t.jsx)("meshStandardMaterial",{color:"#fde68a",emissive:"#fbbf24",emissiveIntensity:1.35})}),(0,t.jsx)(a.Sphere,{args:[.6,24,24],position:[-14,-7,-17],children:(0,t.jsx)("meshStandardMaterial",{color:"#93c5fd",emissive:"#3b82f6",emissiveIntensity:.8})}),(0,t.jsx)(a.Sphere,{args:[.42,24,24],position:[15,-8,-20],children:(0,t.jsx)("meshStandardMaterial",{color:"#f9a8d4",emissive:"#db2777",emissiveIntensity:.55})}),(0,t.jsx)(a.Sphere,{args:[.32,24,24],position:[-10,9,-19],children:(0,t.jsx)("meshStandardMaterial",{color:"#86efac",emissive:"#10b981",emissiveIntensity:.5})}),(0,t.jsx)(a.Sphere,{args:[.24,24,24],position:[4,-11,-16],children:(0,t.jsx)("meshStandardMaterial",{color:"#fca5a5",emissive:"#ef4444",emissiveIntensity:.45})})]})}function h(){return(0,t.jsxs)("group",{children:[(0,t.jsx)(a.Sphere,{args:[6.8,32,32],position:[-10,2,-25],children:(0,t.jsx)("meshBasicMaterial",{color:"#2563eb",transparent:!0,opacity:.08})}),(0,t.jsx)(a.Sphere,{args:[5.6,32,32],position:[12,-3,-22],children:(0,t.jsx)("meshBasicMaterial",{color:"#8b5cf6",transparent:!0,opacity:.08})}),(0,t.jsx)(a.Sphere,{args:[4.2,32,32],position:[0,10,-21],children:(0,t.jsx)("meshBasicMaterial",{color:"#0891b2",transparent:!0,opacity:.08})})]})}function m({nodes:e,edges:m,focusedTutorId:v,onTutorFocus:x,className:y}){let g,[b,S]=(0,i.useState)(0),[w,M]=(0,i.useState)(null),A=(0,i.useRef)(null);(0,i.useEffect)(()=>{let e=window.setInterval(()=>{S((Math.sin(3.1*(performance.now()/1e3))+1)/2)},80);return()=>window.clearInterval(e)},[]);let E=(0,i.useMemo)(()=>{let t=new Map;for(let i of e)t.set(i.id,d(i.lat,i.lon,2.23));return t},[e]),_=(0,i.useMemo)(()=>l.map(e=>e.map(([e,t])=>d(e,t,2.2+.055))),[]),j=(0,i.useMemo)(()=>c.map(e=>e.map(([e,t])=>d(e,t,2.2+.06))),[]),L=(0,i.useMemo)(()=>m.map(e=>{var t;let i,n=E.get(e.tutorId),r=E.get(e.studentId);return n&&r?{...e,points:(t=e.isActive,(i=new o.Vector3().addVectors(n,r).multiplyScalar(.5)).normalize().multiplyScalar(2.2*(t?1.45:1.28)),[n,i,r])}:null}).filter(e=>!!e),[m,E]),U=(0,i.useMemo)(()=>{let e=new Map;return m.forEach(t=>{let i=e.get(t.tutorId)||{total:0,active:0};i.total+=1,i.active+=+!!t.isActive,e.set(t.tutorId,i);let n=e.get(t.studentId)||{total:0,active:0};n.total+=1,n.active+=+!!t.isActive,e.set(t.studentId,n)}),e},[m]),z=(e,t,i)=>{let n=A.current?.getBoundingClientRect(),r=U.get(e.id)||{total:0,active:0};M({node:e,x:n?t-n.left:t,y:n?i-n.top:i,activeLinks:r.active,totalLinks:r.total})};return(0,t.jsxs)("div",{ref:A,className:`absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_22%_18%,#14235f_0%,#05081d_42%,#020617_86%)] ${y}`,children:[(0,t.jsxs)(n.Canvas,{camera:{position:[0,0,6.3],fov:46},dpr:[1,1.8],style:{position:"absolute",top:0,left:0,width:"100%",height:"100%"},children:[(0,t.jsx)("color",{attach:"background",args:["#020617"]}),(0,t.jsx)("ambientLight",{intensity:.45}),(0,t.jsx)("pointLight",{position:[6,4,8],intensity:1.3,color:"#8be9ff"}),(0,t.jsx)("pointLight",{position:[-8,-4,-6],intensity:.55,color:"#60a5fa"}),(0,t.jsx)(u,{}),(0,t.jsx)(h,{}),(0,t.jsx)(p,{}),(0,t.jsx)(f,{}),(0,t.jsx)(a.Sphere,{args:[2.2,96,96],children:(0,t.jsx)("meshStandardMaterial",{color:"#0c2a43",emissive:"#0b3b5e",emissiveIntensity:.36,metalness:.2,roughness:.52})}),(0,t.jsx)(a.Sphere,{args:[2.24,96,96],children:(0,t.jsx)("meshBasicMaterial",{color:"#67e8f9",wireframe:!0,transparent:!0,opacity:.22})}),(0,t.jsx)(a.Sphere,{args:[2.2+.08,64,64],children:(0,t.jsx)("meshBasicMaterial",{color:"#67e8f9",transparent:!0,opacity:.11})}),_.map((e,i)=>(0,t.jsx)(r.Line,{points:e,color:"#7dd3fc",transparent:!0,opacity:.28,lineWidth:1.5},`continent-${i}`)),j.map((e,i)=>(0,t.jsx)(r.Line,{points:e,color:"#a5f3fc",transparent:!0,opacity:.2,lineWidth:1.1},`country-${i}`)),L.map(e=>{let i=v&&e.tutorId===v;return(0,t.jsxs)("group",{children:[(0,t.jsx)(r.Line,{points:e.points,color:e.isActive?"#5eead4":"#38bdf8",transparent:!0,opacity:e.isActive?.45+.45*b:i?.35:.2,lineWidth:e.isActive?i?3:2.4:i?1.5:.95}),e.isActive?(0,t.jsx)(r.Line,{points:e.points,color:"#86efac",transparent:!0,opacity:.2+.25*b,lineWidth:i?4.4:4}):null]},e.id)}),e.map(e=>{let i=E.get(e.id);if(!i)return null;let n="TUTOR"===e.role?.08:.062,r=e.activeSessions>0?1+.35*b:1,s=v&&"TUTOR"===e.role&&e.id===v;return(0,t.jsxs)("group",{position:[i.x,i.y,i.z],children:[(0,t.jsx)(a.Sphere,{args:[n*r,16,16],onPointerOver:t=>{t.stopPropagation(),z(e,t.clientX,t.clientY)},onPointerMove:t=>{z(e,t.clientX,t.clientY)},onPointerOut:()=>M(null),onClick:t=>{t.stopPropagation(),"TUTOR"===e.role&&x?.(e.id)},children:(0,t.jsx)("meshStandardMaterial",{color:"TUTOR"===e.role?"#22d3ee":"#a5b4fc",emissive:"TUTOR"===e.role?"#0ea5e9":"#6366f1",emissiveIntensity:e.activeSessions>0||s?1.12:.55})}),e.activeSessions>0||s?(0,t.jsx)(a.Sphere,{args:[2.4*n*r,12,12],children:(0,t.jsx)("meshBasicMaterial",{color:s?"#f0abfc":"#86efac",transparent:!0,opacity:.14+.22*b})}):null]},e.id)}),(0,t.jsx)(s.OrbitControls,{enablePan:!1,minDistance:4.2,maxDistance:9,autoRotate:!0,autoRotateSpeed:.45})]}),(0,t.jsx)("div",{className:"pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-slate-950/70 via-slate-950/20 to-transparent"}),(0,t.jsx)("div",{className:"pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent"}),w?(0,t.jsxs)("div",{className:"pointer-events-none absolute z-30 w-72 -translate-y-2 rounded-xl border border-slate-500/60 bg-slate-950/95 p-3 text-slate-100 shadow-[0_0_24px_rgba(34,211,238,0.2)]",style:{left:Math.max(8,Math.min(w.x+12,8+(A.current?.clientWidth||0)-304)),top:Math.max(16,w.y-24)},children:[(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)("div",{className:"flex h-10 w-10 items-center justify-center rounded-full border border-slate-500 bg-slate-800 text-xs font-semibold",style:w.node.avatarUrl?{backgroundImage:`url(${w.node.avatarUrl})`,backgroundSize:"cover",backgroundPosition:"center"}:void 0,children:w.node.avatarUrl?"":0===(g=w.node.name.split(/\s+/).filter(Boolean).slice(0,2)).length?"?":g.map(e=>e[0]?.toUpperCase()||"").join("")}),(0,t.jsxs)("div",{className:"min-w-0",children:[(0,t.jsx)("p",{className:"truncate text-sm font-semibold",children:w.node.name}),(0,t.jsx)("p",{className:"truncate text-xs text-slate-300",children:w.node.email})]}),(0,t.jsx)("span",{className:`rounded px-2 py-1 text-[10px] font-semibold ${"TUTOR"===w.node.role?"bg-cyan-500/20 text-cyan-200":"bg-indigo-500/20 text-indigo-200"}`,children:w.node.role})]}),(0,t.jsxs)("div",{className:"mt-3 grid grid-cols-2 gap-2 text-xs text-slate-300",children:[(0,t.jsxs)("div",{className:"rounded border border-slate-700 px-2 py-1",children:["TZ: ",w.node.timezone]}),(0,t.jsxs)("div",{className:"rounded border border-slate-700 px-2 py-1",children:["Active links: ",w.activeLinks]}),(0,t.jsxs)("div",{className:"rounded border border-slate-700 px-2 py-1",children:["Total links: ",w.totalLinks]}),(0,t.jsxs)("div",{className:"rounded border border-slate-700 px-2 py-1",children:["Sessions: ",w.node.activeSessions]})]}),"TUTOR"===w.node.role?(0,t.jsx)("p",{className:"mt-2 text-[11px] text-slate-400",children:"Click tutor node to focus and isolate tutor-student network."}):null]}):null]})}e.s(["default",()=>m])},817434,e=>{e.n(e.i(915975))}]);

//# debugId=b1dfe3ca-24eb-e525-9c2a-bf5eb17be7fc
//# sourceMappingURL=f8dc0918a02ccc7d.js.map