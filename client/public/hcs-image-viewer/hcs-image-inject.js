"use strict";(self.webpackChunkHcsImageViewer=self.webpackChunkHcsImageViewer||[]).push([[822],{186:function(e,t,r){r.r(t),r.d(t,{default:function(){return dt}});var n=r(7462),o=r(7294),i=r(3935),a=r(4942),c=r(9439),s=r(5697),l=r.n(s),u=r(739),f=r(1002),d=r(5671),p=r(3144),v=r(1752),h=r(136),m=r(3930),y=r(1120),g=r(5861),b=r(7757),O=r.n(b),w=r(4088),j=r(8918),P=r(3121);function C(e){var t=e[e.length-1];return 3===t||4===t}function Z(e){if(e&&e.shape){var t=C(e.shape),r=e.shape.slice(t?-3:-2),n=(0,c.Z)(r,2);return{height:n[0],width:n[1]}}}var k,S={column:-1,row:-1},D=function(e){(0,h.Z)(o,e);var t,r,n=(t=o,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,n=(0,y.Z)(t);if(r){var o=(0,y.Z)(this).constructor;e=Reflect.construct(n,arguments,o)}else e=n.apply(this,arguments);return(0,m.Z)(this,e)});function o(){return(0,d.Z)(this,o),n.apply(this,arguments)}return(0,p.Z)(o,[{key:"renderLayers",value:function(){for(var e=this.props,t=e.loader,r=e.id,n=e.mesh,o=void 0===n?{}:n,i=e.hoveredCell,a=o.rows,c=void 0===a?0:a,s=o.columns,l=void 0===s?0:s,u=o.cells,f=void 0===u?[]:u,d=o.selected,p=void 0===d?[]:d,v=o.notSelectedAlpha,h=void 0===v?.75:v,m=Z(t[0])||{},y=m.width,g=void 0===y?0:y,b=m.height,O=[],j=g/l,C=(void 0===b?0:b)/c,k=function(e,t){return[e*j,t*C]},D=function(e,t){return[k(e,t),k(e+1,t),k(e+1,t+1),k(e,t+1)]},x=0;x<c;x+=1)for(var E=0;E<l;E+=1)O.push({column:E,row:x});var L=function(e){return e&&i&&i.column===e.column&&i.row===e.row};O.sort((function(e,t){return Number(L(e))-Number(L(t))}));var I=new P.Z({id:"line-".concat(r),coordinateSystem:w.Df.CARTESIAN,data:O,getPolygon:function(e){return D(e.column,e.row)},getLineWidth:function(e){return L(e)?2:1},lineWidthUnits:"pixels",getLineColor:function(e){return L(e)?[220,220,220]:[120,120,120]},filled:!1,stroked:!0,updateTriggers:{getLineColor:[i||S]}}),R=new P.Z({id:"cell-".concat(r),coordinateSystem:w.Df.CARTESIAN,data:f,getPolygon:function(e){return D(e.column,e.row)},filled:!0,stroked:!1,pickable:!0,getFillColor:[255,255,255,0]});return[new P.Z({id:"cell-not-selected-".concat(r),coordinateSystem:w.Df.CARTESIAN,data:f.filter((function(e){return e&&!p.some((function(t){return t.column===e.column&&t.row===e.row}))})),getPolygon:function(e){return D(e.column,e.row)},filled:!0,stroked:!1,getFillColor:[0,0,0,Math.max(0,Math.min(255,Math.round(255*h)))]}),I,R]}},{key:"onHover",value:function(e){var t=e.object,r=this.props.onHover;return r&&r(t),!0}},{key:"onClick",value:function(e){var t=e.object,r=this.props.onClick;return r&&r(t),!0}}]),o}(j.Z);D.layerName="CollageMeshLayer",D.defaultProps={loader:{type:"object",value:{getRaster:(k=(0,g.Z)(O().mark((function e(){return O().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",{data:[],height:0,width:0});case 1:case"end":return e.stop()}}),e)}))),function(){return k.apply(this,arguments)}),getRasterSize:function(){return{height:0,width:0}},dtype:"<u2"},compare:!0},id:{type:"string",value:"collage-mesh-layer",compare:!0},pickable:{type:"boolean",value:!0,compare:!0},viewState:{type:"object",value:{zoom:0,target:[0,0,0]},compare:!0},mesh:{type:"object",value:{rows:0,columns:0},compare:!0},onHover:{type:"function",value:function(){},compare:!0},onClick:{type:"function",value:function(){},compare:!0}};var x=D,E=r(5395),L=r(3693);function I(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=(0,y.Z)(e);if(t){var o=(0,y.Z)(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return(0,m.Z)(this,r)}}var R=function(e){(0,h.Z)(r,e);var t=I(r);function r(){return(0,d.Z)(this,r),t.apply(this,arguments)}return(0,p.Z)(r,[{key:"getShaders",value:function(){return{inject:{"fs:#decl":"uniform float accuracy;","fs:DECKGL_FILTER_COLOR":"\n          if (color.r < accuracy && color.g < accuracy && color.b < accuracy) {\n            // is transparent\n            color = vec4(0.0, 0.0, 0.0, 0.0);\n          }\n        "}}}},{key:"updateState",value:function(e){for(var t=e.props.ignoreColorAccuracy,r=void 0===t?.1:t,n=this.getModels(),o=0;o<n.length;o+=1)n[o].setUniforms({accuracy:r})}}]),r}(L.Z);function A(e){if(!e)return[1,1,1,1];if("object"===(0,f.Z)(e)&&Array.isArray(e)){var t=(0,c.Z)(e,4),r=t[0],n=void 0===r?1:r,o=t[1],i=void 0===o?1:o,a=t[2],s=void 0===a?1:a,l=t[3];return[n,i,s,void 0===l?1:l]}if("string"==typeof e&&/^#/i.test(e)){var u=function(e){return parseInt(e||"FF",16)/255};return[u(e.slice(1,3)),u(e.slice(3,5)),u(e.slice(5,7)),u(e.slice(7,9))]}if("number"==typeof e){var d=function(e){return Math.max(0,Math.min(1,e))};return[d(e),d(e),d(e),1]}return[1,1,1,1]}var M=function(e){(0,h.Z)(r,e);var t=I(r);function r(){return(0,d.Z)(this,r),t.apply(this,arguments)}return(0,p.Z)(r,[{key:"getShaders",value:function(){return{inject:{"fs:#decl":"uniform float accuracy; uniform vec4 tint;","fs:DECKGL_FILTER_COLOR":"\n          if (color.r < accuracy && color.g < accuracy && color.b < accuracy) {\n            // is transparent\n            color = vec4(0.0, 0.0, 0.0, 0.0);\n          } else {\n            color = tint;\n          }\n        "}}}},{key:"updateState",value:function(e){for(var t=e.props,r=t.ignoreColorAccuracy,n=void 0===r?.1:r,o=t.color,i=void 0===o?[1,1,1,1]:o,a=this.getModels(),c=0;c<a.length;c+=1)a[c].setUniforms({accuracy:n,tint:A(i)})}}]),r}(L.Z);var z=function(e){(0,h.Z)(o,e);var t,r,n=(t=o,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,n=(0,y.Z)(t);if(r){var o=(0,y.Z)(this).constructor;e=Reflect.construct(n,arguments,o)}else e=n.apply(this,arguments);return(0,m.Z)(this,e)});function o(){return(0,d.Z)(this,o),n.apply(this,arguments)}return(0,p.Z)(o,[{key:"renderLayers",value:function(){var e=this.props,t=e.loader,r=e.id,n=e.url,o=e.color,i=e.ignoreColor,a=e.ignoreColorAccuracy,c=Z(t[0])||{},s=c.width,l=void 0===s?0:s,u=c.height,f=void 0===u?0:u;return[new E.Z({id:"image-layer-".concat(r),image:n,bounds:[0,f,l,0],ignoreColorAccuracy:a,color:o,extensions:[!(!i||o)&&new R,!(!i||!o)&&new M].filter(Boolean)})]}}]),o}(j.Z);z.layerName="ImageOverlayLayer",z.defaultProps={loader:{type:"object",value:{getRaster:function(){var e=(0,g.Z)(O().mark((function e(){return O().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",{data:[],height:0,width:0});case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),getRasterSize:function(){return{height:0,width:0}},dtype:"<u2"},compare:!0},id:{type:"string",value:"image-overlay-layer",compare:!0},url:{type:"string",value:void 0,compare:!0},color:{type:"string",value:void 0,compare:!0},ignoreColor:{type:"boolean",value:!1,compare:!0},ignoreColorAccuracy:{type:"number",value:.1,compare:!0},pickable:{type:"boolean",value:!0,compare:!0},viewState:{type:"object",value:{zoom:0,target:[0,0,0]},compare:!0},mesh:{type:"object",value:{rows:0,columns:0},compare:!0},onHover:{type:"function",value:function(){},compare:!0},onClick:{type:"function",value:function(){},compare:!0}};var V=z;function B(e){return"-#".concat(e,"#")}function H(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function T(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?H(Object(r),!0).forEach((function(t){(0,a.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):H(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var N=function(e){(0,h.Z)(o,e);var t,r,n=(t=o,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,n=(0,y.Z)(t);if(r){var o=(0,y.Z)(this).constructor;e=Reflect.construct(n,arguments,o)}else e=n.apply(this,arguments);return(0,m.Z)(this,e)});function o(e){var t;(0,d.Z)(this,o),t=n.call(this,e);var r=e.mesh,i=e.overlayImages,a=void 0===i?[]:i,c=e.onCellHover,s=e.hoveredCell,l=e.onCellClick;return t.onCellHover=c,t.hoveredCell=s,t.onCellClick=l,t.mesh=r,t.overlayImages=a,t}return(0,p.Z)(o,[{key:"getLayers",value:function(e){var t=e.viewStates,r=e.props,n=(0,v.Z)((0,y.Z)(o.prototype),"getLayers",this).call(this,{viewStates:t,props:r}),i=r.loader,a=this.id,c=this.height,s=this.width,l=t[a];return this.overlayImages&&this.overlayImages.forEach((function(e,t){var r,o,u,d;"string"==typeof e?(r=e,o=!0,u=.1):"object"===(0,f.Z)(e)&&e.url&&(r=e.url,o=!!(d=e.color)||!!e.ignoreColor,u=e.ignoreColorAccuracy||.1),r&&n.push(new V({loader:i,url:r,color:d,ignoreColor:o,ignoreColorAccuracy:u,id:"image-".concat(t,"-").concat(B(a)),viewState:T(T({},l),{},{height:c,width:s})}))})),this.mesh&&n.push(new x(T(T({},r),{},{loader:i,id:"mesh-".concat(B(a)),mesh:T({},this.mesh),viewState:T(T({},l),{},{height:c,width:s}),onHover:this.onCellHover,onClick:this.onCellClick,hoveredCell:this.hoveredCell}))),n}}]),o}(u.O6);function F(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function U(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?F(Object(r),!0).forEach((function(t){(0,a.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):F(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var G=function(e){var t=e.loader,r=e.contrastLimits,n=e.colors,i=e.channelsVisible,a=e.viewStates,s=void 0===a?[]:a,l=e.colormap,f=e.overview,d=e.overviewOn,p=e.selections,v=e.hoverHooks,h=void 0===v?{handleValue:function(){},handleCoordinate:function(){}}:v,m=e.height,y=e.width,g=e.lensEnabled,b=void 0!==g&&g,O=e.lensSelection,w=void 0===O?0:O,j=e.lensRadius,P=void 0===j?100:j,C=e.lensBorderColor,Z=void 0===C?[255,255,255]:C,k=e.lensBorderRadius,S=void 0===k?.02:k,D=e.clickCenter,x=void 0===D||D,E=e.transparentColor,L=e.onViewStateChange,I=e.onHover,R=e.onViewportLoad,A=e.extensions,M=void 0===A?[]:A,z=e.deckProps,V=e.mesh,B=e.onCellClick,H=e.overlayImages,T=null==s?void 0:s.find((function(e){return e.id===u.ys})),F=(0,o.useMemo)((function(){return T||(0,u.TI)(t,{height:m,width:y},.5)}),[t,T]),G=(0,o.useState)(void 0),_=(0,c.Z)(G,2),W=_[0],$=_[1],K=(0,o.useCallback)((function(e){e&&!W?$(e):e?e&&W&&e.column!==W.column&&e.row!==W.row&&$(e):$(e)}),[W,$]),Q=new N({id:u.ys,height:m,width:y,mesh:V,onCellHover:K,hoveredCell:W,onCellClick:B,overlayImages:H}),q={loader:t,contrastLimits:r,colors:n,channelsVisible:i,selections:p,onViewportLoad:R,colormap:l,lensEnabled:b,lensSelection:w,lensRadius:P,lensBorderColor:Z,lensBorderRadius:S,extensions:M,transparentColor:E},J=[],X=[],Y=[];if(J.push(Q),X.push(q),Y.push(U(U({},F),{},{id:u.ys})),d&&t){var ee=(null==s?void 0:s.find((function(e){return e.id===u.cl})))||U(U({},F),{},{id:u.cl}),te=new u.A6(U({id:u.cl,loader:t,detailHeight:m,detailWidth:y,clickCenter:x},f));J.push(te),X.push(U(U({},q),{},{lensEnabled:!1})),Y.push(ee)}return t?o.createElement(u.iP,{layerProps:X,views:J,viewStates:Y,hoverHooks:h,onViewStateChange:L,onHover:I,deckProps:z}):null},_="set-data",W="set-source-initializing",$="set-source",K="set-source-error",Q="set-image",q="set-image-viewport-loaded",J="set-mesh",X="set-overlay-images";function Y(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function ee(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Y(Object(r),!0).forEach((function(t){(0,a.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Y(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function te(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function re(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?te(Object(r),!0).forEach((function(t){(0,a.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):te(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function ne(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function oe(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ne(Object(r),!0).forEach((function(t){(0,a.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ne(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var ie=function(e,t){switch(t.type){case _:return function(e,t){var r=t.url,n=t.offsetsUrl,o=t.callback,i=e.url,a=e.offsetsUrl;return i===r&&n===a?(o&&o(),e):ee(ee({},e),{},{loader:void 0,metadata:void 0,imageIndex:0,imageTimePosition:0,imageZPosition:0,mesh:void 0,source:void 0,sourcePending:!1,sourceError:!1,sourceCallback:o,error:void 0,url:r,offsetsUrl:n})}(e,t);case"set-error":return function(e,t){var r=t.error;return re(re({},e),{},{error:r})}(e,t);case W:return function(e){return oe(oe({},e),{},{loader:void 0,metadata:void 0,imageIndex:0,source:void 0,sourceError:void 0,sourcePending:!0,imagePending:!1,overlayImages:[]})}(e);case K:return function(e,t){var r=t.error,n=e.sourceCallback;return"function"==typeof n&&setTimeout((function(){n({error:r})}),0),oe(oe({},e),{},{loader:void 0,metadata:void 0,imageIndex:0,source:void 0,sourceError:r,sourcePending:!1,sourceCallback:void 0,overlayImages:[]})}(e,t);case $:return function(e,t){var r=t.source,n=e.sourceCallback;"function"==typeof n&&setTimeout((function(){n()}),0);var o=Array.isArray(r)?r:[r],i=o.map((function(e){return e.data})),a=o.map((function(e){return e.metadata}));return oe(oe({},e),{},{loader:i,metadata:a,imageIndex:0,source:r,sourceError:void 0,sourcePending:!1,sourceCallback:void 0,overlayImages:[]})}(e,t);case Q:return function(e,t){var r,n=t.index,o=t.ID,i=t.Name,a=t.search,s=t.imageTimePosition,l=void 0===s?0:s,u=t.imageZPosition,f=void 0===u?0:u,d=t.mesh,p=t.overlayImages,v=void 0===p?[]:p,h=e.metadata,m=void 0===h?[]:h,y=e.imageIndex;if(null!=n)r=m[n];else if(void 0!==o)r=m.find((function(e){return e.ID===o}));else if(void 0!==i)r=m.find((function(e){return(e.Name||e.name||"").toLowerCase()===i.toLowerCase()}));else if(a&&/^[\d]+_[\d]+$/.test(a)){var g=/^([\d]+)_([\d])+$/.exec(a),b=(0,c.Z)(g,3),O=b[1],w=b[2],j=new RegExp("^\\s*well\\s+".concat(O,"\\s*,\\s*field\\s+").concat(w,"\\s*$"),"i");r=m.find((function(e){return j.test(e.Name||e.name)}))}if(r){var P=m.indexOf(r);return oe(oe({},e),{},{imageIndex:P,imagePending:y!==P,imageTimePosition:l,imageZPosition:f,mesh:d,overlayImages:v})}return e}(e,t);case q:return function(e){return oe(oe({},e),{},{imagePending:!1})}(e);case J:return function(e,t){var r=t.mesh;return oe(oe({},e),{},{mesh:r})}(e,t);case X:return function(e,t){var r=t.overlayImages,n=void 0===r?[]:r;return oe(oe({},e),{},{overlayImages:n})}(e,t);default:return e}},ae=r(9833),ce="set-default",se="set-loading",le="set-loaded",ue="set-error",fe="set-channel-properties",de="set-default-channels-colors",pe="set-color-map",ve="set-lens-channel",he="set-lens-enabled",me="set-global-position",ye="set-lock-channels";function ge(){var e=[];return{identifiers:[],channels:[],channelsVisibility:[],selections:e,builtForSelections:e,globalSelection:void 0,colors:[],domains:[],realDomains:[],contrastLimits:[],useLens:!1,useColorMap:!1,colorMap:"",lensEnabled:!1,lensChannel:0,use3D:!1,pixelValues:[],xSlice:[0,1],ySlice:[0,1],zSlice:[0,1],ready:!1,isRGB:!1,shapeIsInterleaved:!1,pending:!1,globalDimensions:[],metadata:void 0,loader:[],error:void 0,lockChannels:!1}}var be=r(3433),Oe=r(4506),we=r(5702);function je(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Pe(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?je(Object(r),!0).forEach((function(t){(0,a.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):je(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var Ce=r(4925),Ze=["channels","colors","domains","contrastLimits"];function ke(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Se(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ke(Object(r),!0).forEach((function(t){(0,a.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ke(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var De=[],xe=r(4477);function Ee(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Le(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Ee(Object(r),!0).forEach((function(t){(0,a.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Ee(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var Ie=[],Re=[0,1];function Ae(e,t){switch(t.type){case se:return Le(Le({},e),{},{pending:!0,error:void 0});case le:return Le(Le({},e),{},{pending:!1});case fe:return function(e,t,r){var n=Object.entries(r||{}).filter((function(t){var r=(0,c.Z)(t,1)[0];return e&&e[r]&&Array.isArray(e[r])}));if(n.length>0){var o=Pe({},e||{}),i=e.channels,a=(void 0===i?[]:i)[t];return n.forEach((function(e){var r=(0,c.Z)(e,2),n=r[0],i=r[1],s=o[n];o[n]=(0,be.Z)(s),o[n][t]=i,"colors"===n&&a&&we.bA.updateChannelColor(a,i)})),o}return e}(e,t.channel,t.properties);case de:return function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=e||{},n=r.channels,o=void 0===n?[]:n,i=r.colors,a=(void 0===i?[]:i).slice();return Object.entries(t).forEach((function(e){var t=(0,c.Z)(e,2),r=t[0],n=t[1],i=o.findIndex((function(e){return e===r}));i>=0&&(a[i]=n)})),we.bA.update(t),Pe(Pe({},e),{},{colors:a})}(e,t.defaultColors);case pe:var r=t.colorMap,n=void 0===r?"":r;return e.useColorMap?Le(Le({},e),{},{colorMap:n}):e;case ve:var o=t.lensChannel,i=void 0===o?0:o,s=e.lensEnabled,l=e.useLens;return s&&l?Le(Le({},e),{},{lensChannel:i}):e;case he:var u=t.lensEnabled,f=void 0!==u&&u,d=e.lensEnabled,p=e.useLens;return Le(Le({},e),{},p&&!d&&f?{lensEnabled:f,lensChannel:0}:{lensEnabled:!1});case me:var v=t.position,h=void 0===v?{}:v,m=e.globalDimensions,y=void 0===m?[]:m,g=e.selections,b=void 0===g?[]:g,O=e.globalSelection,w=void 0===O?{}:O,j=function(e,t){var r=(y.find((function(t){return t.label===e}))||{}).size,n=void 0===r?0:r;return Math.max(0,Math.min(n,Math.round(t)))},P=Object.entries(h).filter((function(e){var t=(0,c.Z)(e,1)[0];return xe.Z.includes(t)&&y.find((function(e){return e.label===t}))})).map((function(e){var t=(0,c.Z)(e,2),r=t[0],n=t[1];return{dimension:r,position:j(r,n)}}));if(P.length>0){var C=P.map((function(e){var t=e.dimension,r=e.position;return(0,a.Z)({},t,r)})).reduce((function(e,t){return Le(Le({},e),t)}),{}),Z=Le(Le({},w),C),k=b.map((function(e){return Le(Le({},e),C)}));return Le(Le({},e),{},{selections:k,globalSelection:Z})}return e;case ye:var S=t.lock,D=e.contrastLimits,x=void 0===D?Ie:D,E=e.realDomains,L=void 0===E?Ie:E,I=Le(Le({},e),{},{lockChannels:S});return S||(I.domains=L.slice(),I.contrastLimits=x.map((function(e,t){var r=L[t];if(r&&Array.isArray(r)&&2===r.length){var n=(0,Oe.Z)(e),o=n[0],i=n[1],a=n.slice(2),s=(0,c.Z)(r,2),l=s[0],u=s[1],f=function(e){return Math.max(l,Math.min(u,e))};return[f(o),f(i)].concat((0,be.Z)(a))}return e}))),I;case ce:var R=function(e,t){var r=e||{},n=r.lockChannels,o=void 0!==n&&n,i=r.channels,a=void 0===i?De:i,c=r.colors,s=void 0===c?De:c,l=r.domains,u=void 0===l?De:l,f=r.contrastLimits,d=void 0===f?De:f,p=r.channelsVisibility,v=void 0===p?De:p,h=t||{},m=h.channels,y=void 0===m?De:m,g=h.colors,b=void 0===g?De:g,O=h.domains,w=void 0===O?De:O,j=h.contrastLimits,P=void 0===j?De:j,C=(0,Ce.Z)(h,Ze);if(!o)return Se(Se({},C),{},{channels:y,colors:b,domains:w,contrastLimits:P,realDomains:w.slice(),channelsVisibility:y.map((function(){return!0}))});for(var Z=a.slice(),k=[],S=0;S<y.length;S+=1){var D=Z.indexOf(y[S]);-1===D?k.push({channel:y[S],color:b[S],domain:w[S],realDomain:w[S].slice(),contrastLimits:P[S],visibility:!0}):(Z.splice(D,1,void 0),k.push({channel:y[S],color:s[D]||b[S],domain:u[D]||w[S],realDomain:w[S].slice(),contrastLimits:d[D]||P[S],visibility:void 0===v[D]||v[D]}))}return Se(Se({},C),{},{channels:k.map((function(e){return e.channel})),colors:k.map((function(e){return e.color})),domains:k.map((function(e){return e.domain})),realDomains:k.map((function(e){return e.realDomain})),contrastLimits:k.map((function(e){return e.contrastLimits})),channelsVisibility:k.map((function(e){return e.visibility}))})}(e,t),A=R.channels,M=void 0===A?Ie:A,z=R.channelsVisibility,V=void 0===z?Ie:z,B=R.selections,H=void 0===B?Ie:B,T=R.colors,N=void 0===T?Ie:T,F=R.domains,U=void 0===F?Ie:F,G=R.realDomains,_=void 0===G?U.slice():G,W=R.contrastLimits,$=void 0===W?Ie:W,K=R.useLens,Q=void 0!==K&&K,q=R.useColorMap,J=void 0!==q&&q,X=R.colorMap,Y=void 0===X?J?e.colorMap:"":X,ee=R.lensEnabled,te=void 0!==ee&&ee,re=R.lensChannel,ne=void 0===re?0:re,oe=R.xSlice,ie=void 0===oe?Re:oe,ae=R.ySlice,ge=void 0===ae?Re:ae,je=R.zSlice,ke=void 0===je?Re:je,Ee=R.use3D,Ae=void 0!==Ee&&Ee,Me=R.ready,ze=void 0!==Me&&Me,Ve=R.isRGB,Be=void 0!==Ve&&Ve,He=R.shapeIsInterleaved,Te=void 0!==He&&He,Ne=R.globalDimensions,Fe=void 0===Ne?Ie:Ne,Ue=R.metadata,Ge=R.loader;return Le(Le({},e),{},{identifiers:M.map((function(e,t){return"".concat(e||"channel","-").concat(t)})),channels:M,channelsVisibility:V,selections:H,builtForSelections:H,globalSelection:(H||[])[0],pixelValues:new Array((H||[]).length).fill("-----"),colors:N,domains:U,realDomains:_,contrastLimits:$,useLens:Q,useColorMap:J,colorMap:Y,lensEnabled:te,lensChannel:ne,xSlice:ie,ySlice:ge,zSlice:ke,use3D:Ae,ready:ze,isRGB:Be,shapeIsInterleaved:Te,globalDimensions:Fe,error:void 0,metadata:Ue,loader:Ge});case ue:var _e=t.error;return Le(Le({},e),{},{error:_e,pending:!1});default:return e}}var Me=r(3467);function ze(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Ve(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ze(Object(r),!0).forEach((function(t){(0,a.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ze(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function Be(e,t){for(var r=[],n=Ve(Ve({},function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:xe.Z;return e.labels.filter((function(e){return t.includes(e)})).map((function(e){return(0,a.Z)({},e,0)})).reduce((function(e,t){return Ve(Ve({},e),t)}),{})}(e)),t||{}),o=e.labels.map((function(t,r){return{name:t,size:e.shape[r]}})).find((function(e){return!xe.Z.includes(e.name)&&e.size})),i=0;i<Math.min(4,o.size);i+=1)r.push(Ve((0,a.Z)({},o.name,i),n));return C(e.shape)?[Ve(Ve({},r[0]),{},{c:0})]:r}function He(e){return Te.apply(this,arguments)}function Te(){return(Te=(0,g.Z)(O().mark((function e(t){var r,n,o,i,a,c,s;return O().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.loader,n=t.selection,o=Array.isArray(r)?r[r.length-1]:r,e.next=4,o.getRaster({selection:n});case 4:return i=e.sent,a=(0,u.mx)(i.data),c=a.domain,s=a.contrastLimits,e.abrupt("return",{domain:c,contrastLimits:s});case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Ne(e){return Fe.apply(this,arguments)}function Fe(){return(Fe=(0,g.Z)(O().mark((function e(t){var r,n,o,i,a,c,s,l,f,d,p,v;return O().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.loader,n=t.selection,o=r[r.length-1],i=o.shape,a=o.labels,c=i[a.indexOf("z")]>>r.length-1,e.next=6,o.getRaster({selection:Ve(Ve({},n),{},{z:0})});case 6:return s=e.sent,e.next=9,o.getRaster({selection:Ve(Ve({},n),{},{z:Math.floor(c/2)})});case 9:return l=e.sent,e.next=12,o.getRaster({selection:Ve(Ve({},n),{},{z:Math.max(0,c-1)})});case 12:return f=e.sent,d=(0,u.mx)(s.data),p=(0,u.mx)(l.data),v=(0,u.mx)(f.data),e.abrupt("return",{domain:[Math.min(d.domain[0],p.domain[0],v.domain[0]),Math.max(d.domain[1],p.domain[1],v.domain[1])],contrastLimits:[Math.min(d.contrastLimits[0],p.contrastLimits[0],v.contrastLimits[0]),Math.max(d.contrastLimits[1],p.contrastLimits[1],v.contrastLimits[1])]});case 17:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Ue(e){return Ge.apply(this,arguments)}function Ge(){return(Ge=(0,g.Z)(O().mark((function e(t){var r,n,o,i;return O().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.loader,n=t.selection,o=t.use3d,i=o?Ne:He,e.abrupt("return",i({loader:r,selection:n}));case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function _e(e){return We.apply(this,arguments)}function We(){return(We=(0,g.Z)(O().mark((function e(t){var r,n,o,i,a,c;return O().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.loader,n=t.selections,o=t.use3d,e.next=3,Promise.all(n.map((function(e){return Ue({loader:r,selection:e,use3d:o})})));case 3:return i=e.sent,a=i.map((function(e){return e.domain})),c=i.map((function(e){return e.contrastLimits})),e.abrupt("return",{domains:a,contrastLimits:c});case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function $e(e){var t=Array.isArray(e)?e[0]:e,r=t.shape,n=t.labels,o=function(e){var t,r,n=null!==(t=null==e||null===(r=e.meta)||void 0===r?void 0:r.physicalSizes)&&void 0!==t?t:{},o=n.x,i=n.y,a=n.z;if(null!=o&&o.size&&null!=i&&i.size&&null!=a&&a.size){var c=Math.min(a.size,o.size,i.size),s=[o.size/c,i.size/c,a.size/c];return(new Me.Z).scale(s)}return(new Me.Z).identity()}(t);return[[0,o[0]*r[n.indexOf("x")]],[0,o[5]*r[n.indexOf("y")]],[0,o[10]*r[n.indexOf("z")]]]}function Ke(e){var t=e.Pixels||{},r=t.Channels,n=void 0===r?[]:r,o=t.SizeC,i=void 0===o?0:o,a=t.Interleaved,c=void 0!==a&&a,s=t.Type,l=n.length,u=(n[0]||{}).SamplesPerPixel;return 3===(void 0===u?0:u)||3===l&&"uint8"===s||3===i&&1===l&&c}var Qe=[0,255];function qe(e,t){return e.Name||e.name||e.ID||"Channel ".concat(t+1)}function Je(e,t,r,n){return Xe.apply(this,arguments)}function Xe(){return(Xe=(0,g.Z)(O().mark((function e(t,r,n,o){var i,a,s,l,u,f,d,p,v,h,m,y,g,b,w,j,P,Z,k,S,D,x,E,L;return O().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(i=t[0]||{},a=i.shape,s=i.labels,l=(void 0===s?[]:s).map((function(e,t){return{label:e,size:a[t]||0}})).filter((function(e){return e.size>1&&xe.Z.includes(e.label)})),u=n||Be(t[0],o),f=r.Pixels,d=(void 0===f?{}:f).Channels,p=void 0===d?[]:d,v=[],h=[],m=[],y=!1,g=!1,b=Ke(r),w=b&&C(a),j=p.map(qe),!b){e.next=19;break}C(a)?(v=[Qe.slice()],m=[Qe.slice()],h=[we.Q6]):(v=[Qe.slice(),Qe.slice(),Qe.slice()],m=[Qe.slice(),Qe.slice(),Qe.slice()],h=[we.Q6,we.ek,we.iN]),y=!1,g=!1,e.next=28;break;case 19:return e.next=21,_e({loader:t,selections:u,use3d:!1});case 21:for(P=e.sent,m=P.domains.slice(),v=P.contrastLimits.slice(),h=[],Z=0;Z<j.length;Z+=1)(k=we.bA.getColorForChannel(j[Z]))?h.push(k):1===j.length?h.push(we.ix):h.push(we.ZP[h.length%we.ZP.length]);y=p.length>1,g=!0;case 28:return S=$e(t),D=(0,c.Z)(S,3),x=D[0],E=D[1],L=D[2],e.abrupt("return",{channels:j,selections:u,useLens:y,useColorMap:g,colors:h,domains:m,contrastLimits:v,xSlice:x,ySlice:E,zSlice:L,ready:!0,isRGB:b,shapeIsInterleaved:w,globalDimensions:l,metadata:r,loader:t});case 30:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Ye(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function et(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Ye(Object(r),!0).forEach((function(t){(0,a.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Ye(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function tt(e,t,r){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},i=n.selections,a=n.cache,c=n.imageTimePosition,s=void 0===c?0:c,l=n.imageZPosition,u=void 0===l?0:l,f=(0,o.useRef)(0);(0,o.useEffect)((function(){var n=e&&t&&e.Pixels&&t.length;if(n&&(i&&i!==a||!i)){r({type:se}),f.current+=1;var o=f.current;Je(t,e,i,s||u?{t:s,z:u}:void 0).then((function(e){o===f.current&&r(et({type:ce},e))})).catch((function(e){console.warn("HCS Image Viewer error: ".concat(e.message)),console.error(e),r({type:ue,error:e.message})}))}else n||r({type:ce})}),[e,t,s,u,i,a,f,r])}function rt(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function nt(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?rt(Object(r),!0).forEach((function(t){(0,a.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):rt(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function ot(){return{}}function it(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,n=Array.isArray(e)?e[0]:e,o=Z(n);if(o&&t){var i=o.width,a=o.height;return Math.log2(Math.min(t.width/i,t.height/a))-r}return-1/0}function at(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function ct(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?at(Object(r),!0).forEach((function(t){(0,a.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):at(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var st=new u.$h,lt=new u.z6;function ut(e){var t=e.className,r=e.onStateChange,n=e.onRegisterStateActions,i=e.onViewerStateChanged,a=e.style,s=e.minZoomBackOff,l=void 0===s?0:s,f=e.maxZoomBackOff,d=void 0===f?void 0:f,p=e.defaultZoomBackOff,v=void 0===p?0:p,h=e.overview,m=e.onCellClick,y=function(){var e=(0,o.useReducer)(ie,{},ot),t=(0,c.Z)(e,2),r=t[0],n=t[1];!function(e,t){var r=e||{},n=r.url,i=r.offsetsUrl;r.source,(0,o.useEffect)((function(){n&&(t({type:W}),(0,ae.C)({url:n,offsetsUrl:i}).then((function(e){return t({type:$,source:e})})).catch((function(e){return t({type:K,error:e.message})})))}),[n,i,t])}(r,n);var i=function(e){var t=(0,o.useReducer)(Ae,{},ge),r=(0,c.Z)(t,2),n=r[0],i=r[1],a=function(e){var t=e.imageIndex,r=void 0===t?0:t,n=e.metadata,o=void 0===n?[]:n;if(!(r<0||r>=o.length))return o[r]}(e),s=function(e){var t=e.imageIndex,r=void 0===t?0:t,n=e.loader,o=void 0===n?[]:n;if(!(r<0||r>=o.length))return o[r]}(e),l=e.imageTimePosition,u=void 0===l?0:l,f=e.imageZPosition,d=void 0===f?0:f,p=n.metadata,v=n.loader,h=n.selections,m=n.builtForSelections;return tt(a,s,i,(0,o.useMemo)((function(){return{imageTimePosition:u,imageZPosition:d}}),[u,d])),tt(p,v,i,(0,o.useMemo)((function(){return{selections:h,cache:m}}),[h,m])),{state:n,dispatch:i}}(r),a=i.state,s=i.dispatch,l=(0,o.useCallback)((function(e,t,r){n({url:e,offsetsUrl:t,callback:r,type:_})}),[n]),u=(0,o.useCallback)((function(e){n(nt({type:Q},e))}),[n]),f=(0,o.useCallback)((function(e){n({type:J,mesh:e})}),[n]),d=(0,o.useCallback)((function(){n({type:X,overlayImages:arguments.length>0&&void 0!==arguments[0]?arguments[0]:[]})}),[n]),p=(0,o.useCallback)((function(e){n(nt({type:q},e)),s({type:le})}),[n,s]),v=(0,o.useCallback)((function(){s({type:se})}),[s]),h=(0,o.useCallback)((function(e,t){s({type:fe,channel:e,properties:t})}),[s]),m=(0,o.useCallback)((function(){s({type:de,defaultColors:arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}})}),[s]),y=(0,o.useCallback)((function(e){s({type:pe,colorMap:e})}),[s]),g=(0,o.useCallback)((function(e){s({type:he,lensEnabled:e})}),[s]),b=(0,o.useCallback)((function(e){s({type:ve,lensChannel:e})}),[s]),O=(0,o.useCallback)((function(e){s({type:me,position:e})}),[s]),w=(0,o.useCallback)((function(e){s({type:ye,lock:e})}),[s]);return{callbacks:(0,o.useMemo)((function(){return{setData:l,setImage:u,setImageViewportLoading:v,setImageViewportLoaded:p,setChannelProperties:h,setDefaultChannelsColors:m,setColorMap:y,setLensEnabled:g,setLensChannel:b,setGlobalPosition:O,setLockChannels:w,setMesh:f,setOverlayImages:d}}),[l,u,v,p,h,m,y,g,b,O,w,f,d]),dispatch:n,state:r,viewerState:a,viewerDispatch:s}}(),g=y.state,b=y.viewerState,O=y.callbacks,w=g.mesh,j=g.overlayImages,P=(0,o.useRef)(),C=function(e){var t=(0,o.useState)({width:void 0,height:void 0}),r=(0,c.Z)(t,2),n=r[0],i=r[1];return(0,o.useEffect)((function(){var t,r,n;return function o(){var a,c,s=null==e||null===(a=e.current)||void 0===a?void 0:a.clientWidth,l=null==e||null===(c=e.current)||void 0===c?void 0:c.clientHeight;e&&e.current&&(s!==t||l!==r)&&i({width:t=s,height:r=l}),n=requestAnimationFrame(o)}(),function(){return cancelAnimationFrame(n)}}),[e,i]),n}(P);(0,o.useEffect)((function(){r&&r(g)}),[g,r]),(0,o.useEffect)((function(){i&&i(b)}),[b,i]),(0,o.useEffect)((function(){n&&n(O)}),[O,n]);var Z=O||{},k=Z.setImageViewportLoading,S=Z.setImageViewportLoaded,D=b.channelsVisibility,x=void 0===D?[]:D,E=b.contrastLimits,L=void 0===E?[]:E,I=b.colors,R=void 0===I?[]:I,A=b.selections,M=void 0===A?[]:A,z=b.ready,V=void 0!==z&&z,B=b.colorMap,H=b.loader,T=b.useLens,N=b.lensEnabled,F=b.lensChannel;(0,o.useEffect)((function(){"function"==typeof k&&k()}),[M,H,k]);var U=(0,o.useState)(void 0),Y=(0,c.Z)(U,2),ee=Y[0],te=Y[1];(0,o.useEffect)((function(){if(H&&H.length&&C.width&&C.height){var e=Array.isArray(H)?H:[H],t=(0,c.Z)(e,1)[0],r=Array.isArray(H)?H[H.length-1]:H,n=[ct(ct({},(0,u.TI)(H,C,v)),{},{id:u.ys,minZoom:void 0!==l?it(t,C,l):-1/0,maxZoom:void 0!==d?it(r,C,d):1/0})];te(n)}else te(void 0)}),[H,C,te,l,d,v]);var re=H&&V&&C.width&&C.height&&ee;return o.createElement("div",{className:t,style:ct({position:"relative"},a||{}),ref:P},re&&o.createElement(G,{mesh:w,overlayImages:j,contrastLimits:L,colors:R,channelsVisible:x,loader:H,selections:M,height:C.height,width:C.width,extensions:B?[st]:[lt],colormap:B||"viridis",onViewportLoad:S,viewStates:ee,overviewOn:!!h,overview:h,lensSelection:T&&N?F:void 0,lensEnabled:T&&N,onCellClick:m,deckProps:{glOptions:{preserveDrawingBuffer:!0}}}))}ut.propTypes={className:l().string,onStateChange:l().func,onRegisterStateActions:l().func,onViewerStateChanged:l().func,style:l().object,minZoomBackOff:l().number,maxZoomBackOff:l().number,defaultZoomBackOff:l().number,overview:l().object,onCellClick:l().func},ut.defaultProps={className:void 0,onStateChange:void 0,onRegisterStateActions:void 0,onViewerStateChanged:void 0,style:void 0,minZoomBackOff:0,maxZoomBackOff:void 0,defaultZoomBackOff:0,overview:void 0,onCellClick:void 0};var ft=ut;function dt(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},a=r.onStateChange,c=r.onRegisterStateActions,s=r.onViewerStateChanged,l=r.onCellClick;i.render(o.createElement(ft,(0,n.Z)({onRegisterStateActions:c,onStateChange:a,onViewerStateChanged:s,onCellClick:l},t)),e)}}}]);