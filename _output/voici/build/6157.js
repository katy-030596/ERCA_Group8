"use strict";(self.webpackChunk_JUPYTERLAB_CORE_OUTPUT=self.webpackChunk_JUPYTERLAB_CORE_OUTPUT||[]).push([[6157],{80103:(e,t,s)=>{s.d(t,{B2:()=>o,eT:()=>l,gQ:()=>r});var i,n=s(64098),a=(s(55455),s(27866));function r(e,t,s){return e.rename(t,s).catch((i=>{if(409!==i.response.status)throw i;return o(s).then((i=>i?e.overwrite(t,s):Promise.reject("File not renamed")))}))}function o(e,t){const s=(t=t||a.nullTranslator).load("jupyterlab"),i={title:s.__("Overwrite file?"),body:s.__('"%1" already exists, overwrite?',e),buttons:[n.Dialog.cancelButton(),n.Dialog.warnButton({label:s.__("Overwrite"),ariaLabel:s.__("Overwrite Existing File")})]};return(0,n.showDialog)(i).then((e=>Promise.resolve(e.button.accept)))}function l(e){return e.length>0&&!/[\/\\:]/.test(e)}s(23190),function(e){e.createRenameNode=function(e,t){const s=(t=t||a.nullTranslator).load("jupyterlab"),i=document.createElement("div"),n=document.createElement("label");n.textContent=s.__("File Path");const r=document.createElement("span");r.textContent=e;const o=document.createElement("label");o.textContent=s.__("New Name"),o.className="jp-new-name-title";const l=document.createElement("input");return i.appendChild(n),i.appendChild(r),i.appendChild(o),i.appendChild(l),i}}(i||(i={}))},57926:(e,t,s)=>{s.d(t,{V:()=>f});var i=s(64098),n=s(55455),a=s(46630),r=s(27866),o=s(18246),l=s(50558),h=s(99969),c=s(53968);class d{constructor(e){this._autosaveTimer=-1,this._minInterval=-1,this._interval=-1,this._isActive=!1,this._inDialog=!1,this._isDisposed=!1,this._multiplier=10,this._context=e.context,this._isConnectedCallback=e.isConnectedCallback||(()=>!0);const t=e.saveInterval||120;this._minInterval=1e3*t,this._interval=this._minInterval,this._context.fileChanged.connect(this._setTimer,this),this._context.disposed.connect(this.dispose,this)}get saveInterval(){return this._interval/1e3}set saveInterval(e){this._minInterval=this._interval=1e3*e,this._isActive&&this._setTimer()}get isActive(){return this._isActive}get isDisposed(){return this._isDisposed}dispose(){this.isDisposed||(this._isDisposed=!0,clearTimeout(this._autosaveTimer),c.Signal.clearData(this))}start(){this._isActive=!0,this._setTimer()}stop(){this._isActive=!1,clearTimeout(this._autosaveTimer)}_setTimer(){clearTimeout(this._autosaveTimer),this._isActive&&(this._autosaveTimer=window.setTimeout((()=>{this._isConnectedCallback()&&this._save()}),this._interval))}_save(){const e=this._context;if(this._setTimer(),!e)return;if(!e.contentsModel||!e.contentsModel.writable||!e.model.dirty||this._inDialog)return;const t=(new Date).getTime();e.save().then((()=>{if(this.isDisposed)return;const e=(new Date).getTime()-t;this._interval=Math.max(this._multiplier*e,this._minInterval),this._setTimer()})).catch((e=>{const{name:t}=e;"ModalCancelError"!==t&&"ModalDuplicateError"!==t&&console.error("Error in Auto-Save",e.message)}))}}var u,_,p=s(75324),g=s(68082);class m{constructor(e){this._activateRequested=new c.Signal(this),this._confirmClosingTab=!1,this._isDisposed=!1,this._stateChanged=new c.Signal(this),this._registry=e.registry,this.translator=e.translator||r.nullTranslator}get activateRequested(){return this._activateRequested}get confirmClosingDocument(){return this._confirmClosingTab}set confirmClosingDocument(e){if(this._confirmClosingTab!==e){const t=this._confirmClosingTab;this._confirmClosingTab=e,this._stateChanged.emit({name:"confirmClosingDocument",oldValue:t,newValue:e})}}get stateChanged(){return this._stateChanged}get isDisposed(){return this._isDisposed}dispose(){this.isDisposed||(this._isDisposed=!0,c.Signal.disconnectReceiver(this))}createWidget(e,t){const s=e.createNew(t);return this._initializeWidget(s,e,t),s}_initializeWidget(e,t,s){u.factoryProperty.set(e,t);const i=new p.DisposableSet;for(const n of this._registry.widgetExtensions(t.name)){const t=n.createNew(e,s);t&&i.add(t)}u.disposablesProperty.set(e,i),e.disposed.connect(this._onWidgetDisposed,this),this.adoptWidget(s,e),s.fileChanged.connect(this._onFileChanged,this),s.pathChanged.connect(this._onPathChanged,this),s.ready.then((()=>{this.setCaption(e)}))}adoptWidget(e,t){u.widgetsProperty.get(e).push(t),g.MessageLoop.installMessageHook(t,this),t.addClass("jp-Document"),t.title.closable=!0,t.disposed.connect(this._widgetDisposed,this),u.contextProperty.set(t,e)}findWidget(e,t){const s=u.widgetsProperty.get(e);if(s)return(0,o.find)(s,(e=>{const s=u.factoryProperty.get(e);return!!s&&s.name===t}))}contextForWidget(e){return u.contextProperty.get(e)}cloneWidget(e){const t=u.contextProperty.get(e);if(!t)return;const s=u.factoryProperty.get(e);if(!s)return;const i=s.createNew(t,e);return this._initializeWidget(i,s,t),i}closeWidgets(e){const t=u.widgetsProperty.get(e);return Promise.all(t.map((e=>this.onClose(e)))).then((()=>{}))}deleteWidgets(e){const t=u.widgetsProperty.get(e);return Promise.all(t.map((e=>this.onDelete(e)))).then((()=>{}))}messageHook(e,t){switch(t.type){case"close-request":return this.onClose(e),!1;case"activate-request":{const t=this.contextForWidget(e);t&&this._activateRequested.emit(t.path);break}}return!0}async setCaption(e){const t=this.translator.load("jupyterlab"),s=u.contextProperty.get(e);if(!s)return;const i=s.contentsModel;if(i)return s.listCheckpoints().then((a=>{if(e.isDisposed)return;const r=a[a.length-1],o=r?n.Time.format(r.last_modified):"None";let l=t.__("Name: %1\nPath: %2\n",i.name,i.path);s.model.readOnly?l+=t.__("Read-only"):l+=t.__("Last Saved: %1\n",n.Time.format(i.last_modified))+t.__("Last Checkpoint: %1",o),e.title.caption=l}));e.title.caption=""}async onClose(e){var t;const[s,i]=await this._maybeClose(e,this.translator);if(e.isDisposed)return!0;if(s){if(!i){const s=u.contextProperty.get(e);if(!s)return!0;(null===(t=s.contentsModel)||void 0===t?void 0:t.writable)?await s.save():await s.saveAs()}if(e.isDisposed)return!0;e.dispose()}return s}onDelete(e){return e.dispose(),Promise.resolve(void 0)}async _maybeClose(e,t){var s,n;const a=(t=t||r.nullTranslator).load("jupyterlab"),o=u.contextProperty.get(e);if(!o)return Promise.resolve([!0,!0]);let l=u.widgetsProperty.get(o);if(!l)return Promise.resolve([!0,!0]);l=l.filter((e=>{const t=u.factoryProperty.get(e);return!!t&&!1===t.readOnly}));const h=e.title.label,c=u.factoryProperty.get(e),d=o.model.dirty&&l.length<=1&&!(null===(s=null==c?void 0:c.readOnly)||void 0===s||s);if(this.confirmClosingDocument){const e=[i.Dialog.cancelButton(),i.Dialog.okButton({label:d?a.__("Close and save"):a.__("Close"),ariaLabel:d?a.__("Close and save Document"):a.__("Close Document")})];d&&e.splice(1,0,i.Dialog.warnButton({label:a.__("Close without saving"),ariaLabel:a.__("Close Document without saving")}));const t=await(0,i.showDialog)({title:a.__("Confirmation"),body:a.__('Please confirm you want to close "%1".',h),checkbox:d?null:{label:a.__("Do not ask me again."),caption:a.__("If checked, no confirmation to close a document will be asked in the future.")},buttons:e});return t.isChecked&&(this.confirmClosingDocument=!1),Promise.resolve([t.button.accept,!d||"warn"===t.button.displayType])}{if(!d)return Promise.resolve([!0,!0]);const e=(null===(n=o.contentsModel)||void 0===n?void 0:n.writable)?a.__("Save"):a.__("Save as"),t=await(0,i.showDialog)({title:a.__("Save your work"),body:a.__('Save changes in "%1" before closing?',h),buttons:[i.Dialog.cancelButton(),i.Dialog.warnButton({label:a.__("Discard"),ariaLabel:a.__("Discard changes to file")}),i.Dialog.okButton({label:e})]});return[t.button.accept,"warn"===t.button.displayType]}}_widgetDisposed(e){const t=u.contextProperty.get(e);if(!t)return;const s=u.widgetsProperty.get(t);s&&(o.ArrayExt.removeFirstOf(s,e),s.length||t.dispose())}_onWidgetDisposed(e){u.disposablesProperty.get(e).dispose()}_onFileChanged(e){const t=u.widgetsProperty.get(e);for(const e of t)this.setCaption(e)}_onPathChanged(e){const t=u.widgetsProperty.get(e);for(const e of t)this.setCaption(e)}}!function(e){e.contextProperty=new h.AttachedProperty({name:"context",create:()=>{}}),e.factoryProperty=new h.AttachedProperty({name:"factory",create:()=>{}}),e.widgetsProperty=new h.AttachedProperty({name:"widgets",create:()=>[]}),e.disposablesProperty=new h.AttachedProperty({name:"disposables",create:()=>new p.DisposableSet})}(u||(u={}));class f{constructor(e){var t;this._activateRequested=new c.Signal(this),this._contexts=[],this._isDisposed=!1,this._autosave=!0,this._autosaveInterval=120,this._lastModifiedCheckMargin=500,this._renameUntitledFileOnSave=!0,this._stateChanged=new c.Signal(this),this.translator=e.translator||r.nullTranslator,this.registry=e.registry,this.services=e.manager,this._dialogs=null!==(t=e.sessionDialogs)&&void 0!==t?t:new i.SessionContextDialogs({translator:e.translator}),this._isConnectedCallback=e.isConnectedCallback||(()=>!0),this._opener=e.opener,this._when=e.when||e.manager.ready;const s=new m({registry:this.registry,translator:this.translator});s.activateRequested.connect(this._onActivateRequested,this),s.stateChanged.connect(this._onWidgetStateChanged,this),this._widgetManager=s,this._setBusy=e.setBusy}get activateRequested(){return this._activateRequested}get autosave(){return this._autosave}set autosave(e){if(this._autosave!==e){const t=this._autosave;this._autosave=e,this._contexts.forEach((t=>{const s=_.saveHandlerProperty.get(t);s&&(!0!==e||s.isActive?!1===e&&s.isActive&&s.stop():s.start())})),this._stateChanged.emit({name:"autosave",oldValue:t,newValue:e})}}get autosaveInterval(){return this._autosaveInterval}set autosaveInterval(e){if(this._autosaveInterval!==e){const t=this._autosaveInterval;this._autosaveInterval=e,this._contexts.forEach((t=>{const s=_.saveHandlerProperty.get(t);s&&(s.saveInterval=e||120)})),this._stateChanged.emit({name:"autosaveInterval",oldValue:t,newValue:e})}}get confirmClosingDocument(){return this._widgetManager.confirmClosingDocument}set confirmClosingDocument(e){if(this._widgetManager.confirmClosingDocument!==e){const t=this._widgetManager.confirmClosingDocument;this._widgetManager.confirmClosingDocument=e,this._stateChanged.emit({name:"confirmClosingDocument",oldValue:t,newValue:e})}}get lastModifiedCheckMargin(){return this._lastModifiedCheckMargin}set lastModifiedCheckMargin(e){if(this._lastModifiedCheckMargin!==e){const t=this._lastModifiedCheckMargin;this._lastModifiedCheckMargin=e,this._contexts.forEach((t=>{t.lastModifiedCheckMargin=e})),this._stateChanged.emit({name:"lastModifiedCheckMargin",oldValue:t,newValue:e})}}get renameUntitledFileOnSave(){return this._renameUntitledFileOnSave}set renameUntitledFileOnSave(e){if(this._renameUntitledFileOnSave!==e){const t=this._renameUntitledFileOnSave;this._renameUntitledFileOnSave=e,this._stateChanged.emit({name:"renameUntitledFileOnSave",oldValue:t,newValue:e})}}get stateChanged(){return this._stateChanged}get isDisposed(){return this._isDisposed}dispose(){this.isDisposed||(this._isDisposed=!0,c.Signal.clearData(this),this._contexts.forEach((e=>this._widgetManager.closeWidgets(e))),this._widgetManager.dispose(),this._contexts.length=0)}cloneWidget(e){return this._widgetManager.cloneWidget(e)}closeAll(){return Promise.all(this._contexts.map((e=>this._widgetManager.closeWidgets(e)))).then((()=>{}))}closeFile(e){const t=this._contextsForPath(e).map((e=>this._widgetManager.closeWidgets(e)));return Promise.all(t).then((e=>{}))}contextForWidget(e){return this._widgetManager.contextForWidget(e)}copy(e,t){return this.services.contents.copy(e,t)}createNew(e,t="default",s){return this._createOrOpenDocument("create",e,t,s)}deleteFile(e){return this.services.sessions.stopIfNeeded(e).then((()=>this.services.contents.delete(e))).then((()=>(this._contextsForPath(e).forEach((e=>this._widgetManager.deleteWidgets(e))),Promise.resolve(void 0))))}duplicate(e){const t=n.PathExt.dirname(e);return this.services.contents.copy(e,t)}findWidget(e,t="default"){const s=n.PathExt.normalize(e);let i=[t];if("default"===t){const e=this.registry.defaultWidgetFactory(s);if(!e)return;i=[e.name]}else null===t&&(i=this.registry.preferredWidgetFactories(s).map((e=>e.name)));for(const e of this._contextsForPath(s))for(const t of i)if(null!==t){const s=this._widgetManager.findWidget(e,t);if(s)return s}}newUntitled(e){return"file"===e.type&&(e.ext=e.ext||".txt"),this.services.contents.newUntitled(e)}open(e,t="default",s,i){return this._createOrOpenDocument("open",e,t,s,i)}openOrReveal(e,t="default",s,i){const n=this.findWidget(e,t);return n?(this._opener.open(n,{type:t,...i}),n):this.open(e,t,s,null!=i?i:{})}overwrite(e,t){const s=`${t}.${l.UUID.uuid4()}`,i=()=>this.rename(s,t);return this.rename(e,s).then((()=>this.deleteFile(t))).then(i,i)}rename(e,t){return this.services.contents.rename(e,t)}_findContext(e,t){const s=this.services.contents.normalize(e);return(0,o.find)(this._contexts,(e=>e.path===s&&e.factoryName===t))}_contextsForPath(e){const t=this.services.contents.normalize(e);return this._contexts.filter((e=>e.path===t))}_createContext(e,t,s){const i=new a.Context({opener:(e,t)=>{this._widgetManager.adoptWidget(i,e),this._opener.open(e,t)},manager:this.services,factory:t,path:e,kernelPreference:s,setBusy:this._setBusy,sessionDialogs:this._dialogs,lastModifiedCheckMargin:this._lastModifiedCheckMargin,translator:this.translator}),n=new d({context:i,isConnectedCallback:this._isConnectedCallback,saveInterval:this.autosaveInterval});return _.saveHandlerProperty.set(i,n),i.ready.then((()=>{this.autosave&&n.start()})),i.disposed.connect(this._onContextDisposed,this),this._contexts.push(i),i}_onContextDisposed(e){o.ArrayExt.removeFirstOf(this._contexts,e)}_widgetFactoryFor(e,t){const{registry:s}=this;if("default"===t){const i=s.defaultWidgetFactory(e);if(!i)return;t=i.name}return s.getWidgetFactory(t)}_createOrOpenDocument(e,t,s="default",i,n){const a=this._widgetFactoryFor(t,s);if(!a)return;const r=a.modelName||"text",o=this.registry.getModelFactory(r);if(!o)return;const l=this.registry.getKernelPreference(t,a.name,i);let h,c=Promise.resolve(void 0);if("open"===e)h=this._findContext(t,o.name)||null,h||(h=this._createContext(t,o,l),c=this._when.then((()=>h.initialize(!1))));else{if("create"!==e)throw new Error(`Invalid argument 'which': ${e}`);h=this._createContext(t,o,l),c=this._when.then((()=>h.initialize(!0)))}const d=this._widgetManager.createWidget(a,h);return this._opener.open(d,{type:a.name,...n}),c.catch((e=>{console.error(`Failed to initialize the context with '${o.name}' for ${t}`,e),d.close()})),d}_onActivateRequested(e,t){this._activateRequested.emit(t)}_onWidgetStateChanged(e,t){"confirmClosingDocument"===t.name&&this._stateChanged.emit(t)}}!function(e){e.saveHandlerProperty=new h.AttachedProperty({name:"saveHandler",create:()=>{}})}(_||(_={}))},89744:(e,t,s)=>{s.d(t,{q6:()=>p});var i=s(64098),n=s(55455),a=s(80103),r=s(27866),o=s(18246),l=s(50558),h=s(36551),c=s(53968);const d=1048576;class u{constructor(e){var t;this._connectionFailure=new c.Signal(this),this._fileChanged=new c.Signal(this),this._items=[],this._key="",this._pathChanged=new c.Signal(this),this._paths=new Set,this._pending=null,this._pendingPath=null,this._refreshed=new c.Signal(this),this._sessions=[],this._state=null,this._isDisposed=!1,this._restored=new l.PromiseDelegate,this._uploads=[],this._uploadChanged=new c.Signal(this),this.manager=e.manager,this.translator=e.translator||r.nullTranslator,this._trans=this.translator.load("jupyterlab"),this._driveName=e.driveName||"",this._model={path:this.rootPath,name:n.PathExt.basename(this.rootPath),type:"directory",content:void 0,writable:!1,created:"unknown",last_modified:"unknown",mimetype:"text/plain",format:"text"},this._state=e.state||null;const s=e.refreshInterval||1e4,{services:i}=e.manager;i.contents.fileChanged.connect(this.onFileChanged,this),i.sessions.runningChanged.connect(this.onRunningChanged,this),this._unloadEventListener=e=>{if(this._uploads.length>0){const t=this._trans.__("Files still uploading");return e.returnValue=t,t}},window.addEventListener("beforeunload",this._unloadEventListener),this._poll=new h.Poll({auto:null===(t=e.auto)||void 0===t||t,name:"@jupyterlab/filebrowser:Model",factory:()=>this.cd("."),frequency:{interval:s,backoff:!0,max:3e5},standby:e.refreshStandby||"when-hidden"})}get connectionFailure(){return this._connectionFailure}get driveName(){return this._driveName}get restored(){return this._restored.promise}get fileChanged(){return this._fileChanged}get path(){return this._model?this._model.path:""}get rootPath(){return this._driveName?this._driveName+":":""}get pathChanged(){return this._pathChanged}get refreshed(){return this._refreshed}get specs(){return this.manager.services.kernelspecs.specs}get isDisposed(){return this._isDisposed}get uploadChanged(){return this._uploadChanged}uploads(){return this._uploads[Symbol.iterator]()}dispose(){this.isDisposed||(window.removeEventListener("beforeunload",this._unloadEventListener),this._isDisposed=!0,this._poll.dispose(),this._sessions.length=0,this._items.length=0,c.Signal.clearData(this))}items(){return this._items[Symbol.iterator]()}sessions(){return this._sessions[Symbol.iterator]()}async refresh(){await this._poll.refresh(),await this._poll.tick,this._refreshed.emit(void 0)}async cd(e="."){if(e="."!==e?this.manager.services.contents.resolvePath(this._model.path,e):this._pendingPath||this._model.path,this._pending){if(e===this._pendingPath)return this._pending;await this._pending}const t=this.path;this._pendingPath=e,t!==e&&(this._sessions.length=0);const s=this.manager.services;return this._pending=s.contents.get(e,{content:!0}).then((i=>{this.isDisposed||(this.handleContents(i),this._pendingPath=null,this._pending=null,t!==e&&(this._state&&this._key&&this._state.save(this._key,{path:e}),this._pathChanged.emit({name:"path",oldValue:t,newValue:e})),this.onRunningChanged(s.sessions,s.sessions.running()),this._refreshed.emit(void 0))})).catch((t=>{if(this._pendingPath=null,this._pending=null,t.response&&404===t.response.status&&"/"!==e)return t.message=this._trans.__('Directory not found: "%1"',this._model.path),console.error(t),this._connectionFailure.emit(t),this.cd("/");this._connectionFailure.emit(t)})),this._pending}async download(e){const t=await this.manager.services.contents.getDownloadUrl(e),s=document.createElement("a");s.href=t,s.download="",document.body.appendChild(s),s.click(),document.body.removeChild(s)}async restore(e,t=!0){const{manager:s}=this,i=`file-browser-${e}:cwd`,n=this._state;if(!this._key)if(this._key=i,t&&n){await s.services.ready;try{const e=await n.fetch(i);if(!e)return void this._restored.resolve(void 0);const t=e.path;t&&await this.cd("/");const a=s.services.contents.localPath(t);await s.services.contents.get(t),await this.cd(a)}catch(e){await n.remove(i)}this._restored.resolve(void 0)}else this._restored.resolve(void 0)}async upload(e){const t=n.PageConfig.getNotebookVersion(),s=t<[4,0,0]||t>=[5,1,0],i=e.size>15728640;if(i&&!s){const t=this._trans.__("Cannot upload file (>%1 MB). %2",15,e.name);throw console.warn(t),t}if(i&&!await this._shouldUploadLarge(e))throw"Cancelled large file upload";if(await this._uploadCheckDisposed(),await this.refresh(),await this._uploadCheckDisposed(),this._items.find((t=>t.name===e.name))&&!await(0,a.B2)(e.name))throw"File not uploaded";await this._uploadCheckDisposed();const r=s&&e.size>d;return await this._upload(e,r)}async _shouldUploadLarge(e){const{button:t}=await(0,i.showDialog)({title:this._trans.__("Large file size warning"),body:this._trans.__("The file size is %1 MB. Do you still want to upload it?",Math.round(e.size/1048576)),buttons:[i.Dialog.cancelButton({label:this._trans.__("Cancel")}),i.Dialog.warnButton({label:this._trans.__("Upload")})]});return t.accept}async _upload(e,t){let s=this._model.path;s=s?s+"/"+e.name:e.name;const i=e.name,n=async(t,n)=>{await this._uploadCheckDisposed();const a=new FileReader;a.readAsDataURL(t),await new Promise(((t,s)=>{a.onload=t,a.onerror=t=>s(`Failed to upload "${e.name}":`+t)})),await this._uploadCheckDisposed();const r=a.result.split(",")[1],o={type:"file",format:"base64",name:i,chunk:n,content:r};return await this.manager.services.contents.save(s,o)};if(!t)try{return await n(e)}catch(t){throw o.ArrayExt.removeFirstWhere(this._uploads,(t=>e.name===t.path)),t}let a,r={path:s,progress:0};this._uploadChanged.emit({name:"start",newValue:r,oldValue:null});for(let t=0;!a;t+=d){const i=t+d,l=i>=e.size,h=l?-1:i/d,c={path:s,progress:t/e.size};let u;this._uploads.splice(this._uploads.indexOf(r)),this._uploads.push(c),this._uploadChanged.emit({name:"update",newValue:c,oldValue:r}),r=c;try{u=await n(e.slice(t,i),h)}catch(t){throw o.ArrayExt.removeFirstWhere(this._uploads,(t=>e.name===t.path)),this._uploadChanged.emit({name:"failure",newValue:r,oldValue:null}),t}l&&(a=u)}return this._uploads.splice(this._uploads.indexOf(r)),this._uploadChanged.emit({name:"finish",newValue:null,oldValue:r}),a}_uploadCheckDisposed(){return this.isDisposed?Promise.reject("Filemanager disposed. File upload canceled"):Promise.resolve()}handleContents(e){this._model={name:e.name,path:e.path,type:e.type,content:void 0,writable:e.writable,created:e.created,last_modified:e.last_modified,size:e.size,mimetype:e.mimetype,format:e.format},this._items=e.content,this._paths.clear(),e.content.forEach((e=>{this._paths.add(e.path)}))}onRunningChanged(e,t){this._populateSessions(t),this._refreshed.emit(void 0)}onFileChanged(e,t){const s=this._model.path,{sessions:i}=this.manager.services,{oldValue:a,newValue:r}=t;if(a&&a.path&&n.PathExt.dirname(a.path)===s?a:r&&r.path&&n.PathExt.dirname(r.path)===s?r:void 0)return this._poll.refresh(),this._populateSessions(i.running()),void this._fileChanged.emit(t)}_populateSessions(e){this._sessions.length=0;for(const t of e)this._paths.has(t.path)&&this._sessions.push(t)}}class _ extends u{constructor(e){super(e),this._includeHiddenFiles=e.includeHiddenFiles||!1}items(){return this._includeHiddenFiles?super.items():(0,o.filter)(super.items(),(e=>!e.name.startsWith(".")))}showHiddenFiles(e){this._includeHiddenFiles=e,this.refresh()}}class p extends _{constructor(e){var t,s;super(e),this._filter=null!==(t=e.filter)&&void 0!==t?t:e=>({}),this._filterDirectories=null===(s=e.filterDirectories)||void 0===s||s}get filterDirectories(){return this._filterDirectories}set filterDirectories(e){this._filterDirectories=e}items(){return(0,o.filter)(super.items(),(e=>{if(this._filterDirectories||"directory"!==e.type){const t=this._filter(e);return e.indices=null==t?void 0:t.indices,!!t}return!0}))}setFilter(e){this._filter=e,this.refresh()}}},82609:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var s="",i=void 0!==t[5];return t[4]&&(s+="@supports (".concat(t[4],") {")),t[2]&&(s+="@media ".concat(t[2]," {")),i&&(s+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),s+=e(t),i&&(s+="}"),t[2]&&(s+="}"),t[4]&&(s+="}"),s})).join("")},t.i=function(e,s,i,n,a){"string"==typeof e&&(e=[[null,e,void 0]]);var r={};if(i)for(var o=0;o<this.length;o++){var l=this[o][0];null!=l&&(r[l]=!0)}for(var h=0;h<e.length;h++){var c=[].concat(e[h]);i&&r[c[0]]||(void 0!==a&&(void 0===c[5]||(c[1]="@layer".concat(c[5].length>0?" ".concat(c[5]):""," {").concat(c[1],"}")),c[5]=a),s&&(c[2]?(c[1]="@media ".concat(c[2]," {").concat(c[1],"}"),c[2]=s):c[2]=s),n&&(c[4]?(c[1]="@supports (".concat(c[4],") {").concat(c[1],"}"),c[4]=n):c[4]="".concat(n)),t.push(c))}},t}},78991:e=>{e.exports=function(e,t){return t||(t={}),e?(e=String(e.__esModule?e.default:e),/^['"].*['"]$/.test(e)&&(e=e.slice(1,-1)),t.hash&&(e+=t.hash),/["'() \t\n]|(%20)/.test(e)||t.needQuotes?'"'.concat(e.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):e):e}},39601:e=>{e.exports=function(e){return e[1]}},46062:e=>{var t=[];function s(e){for(var s=-1,i=0;i<t.length;i++)if(t[i].identifier===e){s=i;break}return s}function i(e,i){for(var a={},r=[],o=0;o<e.length;o++){var l=e[o],h=i.base?l[0]+i.base:l[0],c=a[h]||0,d="".concat(h," ").concat(c);a[h]=c+1;var u=s(d),_={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==u)t[u].references++,t[u].updater(_);else{var p=n(_,i);i.byIndex=o,t.splice(o,0,{identifier:d,updater:p,references:1})}r.push(d)}return r}function n(e,t){var s=t.domAPI(t);return s.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;s.update(e=t)}else s.remove()}}e.exports=function(e,n){var a=i(e=e||[],n=n||{});return function(e){e=e||[];for(var r=0;r<a.length;r++){var o=s(a[r]);t[o].references--}for(var l=i(e,n),h=0;h<a.length;h++){var c=s(a[h]);0===t[c].references&&(t[c].updater(),t.splice(c,1))}a=l}}},96793:e=>{var t={};e.exports=function(e,s){var i=function(e){if(void 0===t[e]){var s=document.querySelector(e);if(window.HTMLIFrameElement&&s instanceof window.HTMLIFrameElement)try{s=s.contentDocument.head}catch(e){s=null}t[e]=s}return t[e]}(e);if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(s)}},11173:e=>{e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},17892:(e,t,s)=>{e.exports=function(e){var t=s.nc;t&&e.setAttribute("nonce",t)}},44036:e=>{e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=e.insertStyleElement(e);return{update:function(s){!function(e,t,s){var i="";s.supports&&(i+="@supports (".concat(s.supports,") {")),s.media&&(i+="@media ".concat(s.media," {"));var n=void 0!==s.layer;n&&(i+="@layer".concat(s.layer.length>0?" ".concat(s.layer):""," {")),i+=s.css,n&&(i+="}"),s.media&&(i+="}"),s.supports&&(i+="}");var a=s.sourceMap;a&&"undefined"!=typeof btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),t.styleTagTransform(i,e,t.options)}(t,e,s)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},42464:e=>{e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}}]);