"use strict";(self.webpackChunk_JUPYTERLAB_CORE_OUTPUT=self.webpackChunk_JUPYTERLAB_CORE_OUTPUT||[]).push([[5985,3305],{85985:(e,n,t)=>{t.r(n),t.d(n,{default:()=>s});var a=t(64098),r=t(50558);const i=new r.Token("@jupyterlab/docmanager:IDocumentManager","A service for the manager for all\n  documents used by the application. Use this if you want to open and close documents,\n  create and delete files, and otherwise interact with the file system.");new r.Token("@jupyterlab/docmanager:IDocumentWidgetOpener","A service to open a widget.");var o,d=t(88252),l=t(27866);!function(e){e.handleLink="rendermime:handle-local-link"}(o||(o={}));const s={id:"@jupyterlab/rendermime-extension:plugin",description:"Provides the render mime registry.",optional:[i,d.ILatexTypesetter,a.ISanitizer,d.IMarkdownParser,l.ITranslator],provides:d.IRenderMimeRegistry,activate:function(e,n,t,a,r,i){const s=(null!=i?i:l.nullTranslator).load("jupyterlab");return n&&e.commands.addCommand(o.handleLink,{label:s.__("Handle Local Link"),execute:e=>{const t=e.path,a=e.id;if(t)return n.services.contents.get(t,{content:!1}).then((()=>{const e=n.registry.defaultRenderedWidgetFactory(t),r=n.openOrReveal(t,e.name);r&&a&&r.setFragment(a)}))}}),new d.RenderMimeRegistry({initialFactories:d.standardRendererFactories,linkHandler:n?{handleLink:(n,t,a)=>{"A"===n.tagName&&n.hasAttribute("download")||e.commandLinker.connectNode(n,o.handleLink,{path:t,id:a})}}:void 0,latexTypesetter:null!=t?t:void 0,markdownParser:null!=r?r:void 0,translator:null!=i?i:void 0,sanitizer:null!=a?a:void 0})},autoStart:!0}}}]);