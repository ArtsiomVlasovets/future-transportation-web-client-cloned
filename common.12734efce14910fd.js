"use strict";(self.webpackChunkfuture_transportation_web_client=self.webpackChunkfuture_transportation_web_client||[]).push([[592],{8578:(M,C,i)=>{i.d(C,{w:()=>g});var d=i(4762),h=i(1718),v=i(6741),_=i(2754),e=i(3668),p=i(9522),c=i(8595),u=i(4099);let l=(()=>{class n{constructor(t){this.router=t,this.navigationState=new u.X("")}navigate(t){this.router.navigate([t])}}return n.\u0275fac=function(t){return new(t||n)(e.LFG(p.F0))},n.\u0275prov=e.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})();const m=[{locale:"English",localeId:"en-US"},{locale:"French",localeId:"fr"},{locale:"Spanish",localeId:"es"}];var S=i(7245),T=i(9259),x=i(6019),y=i(2676),f=i(432);function k(n,o){if(1&n&&(e.TgZ(0,"h2"),e._uU(1),e.qZA()),2&n){const t=e.oxw();e.xp6(1),e.hij(" ",t.customMsgService.translate(t.currentPage)," ")}}function w(n,o){1&n&&e._UZ(0,"span",14)}const Z=function(){return["Material","Custom"]},I=function(n){return{"material-bg":n}};let L=(()=>{class n{constructor(t,s,r,a,P){this.messages=t,this.store=s,this.localeId=r,this.intlService=a,this.cdf=P,this.toggle=new e.vpe,this.currentPage="",this.selectedLanguage={locale:"English",localeId:"en-US"},this.locales=m,this.popupSettings={width:"150"},this.themes=[{href:"assets/custom-default-theme/dist/all.css",text:"Default"},{href:"assets/custom-default-theme-urban/dist/all.css",text:"Default-Urban"},{href:"assets/custom-material-theme-indigo/dist/all.css",text:"Material-Indigo"},{href:"assets/custom-material-theme-teal/dist/all.css",text:"Material-Teal"}],this.selectedTheme=this.themes[0],this.listItems=["Profile","Settings","Log Out"],this.localeId=this.selectedLanguage.localeId,this.setLocale(this.localeId),this.customMsgService=this.messages,this.customMsgService.language=this.selectedLanguage.localeId,this.initCustomiztion()}ngOnChanges(t){var s,r;((null===(s=null==t?void 0:t.selectedPage)||void 0===s?void 0:s.currentValue)!==(null===(r=null==t?void 0:t.selectedPage)||void 0===r?void 0:r.previousValue)||(null==t?void 0:t.selectedPage))&&(this.currentPage=null==t?void 0:t.selectedPage.currentValue,console.log("this.currentPage :>> ",this.currentPage),this.cdf.markForCheck())}initCustomiztion(){const t=m.find(s=>{localStorage.getItem("localeId")})||m[0];this.changeTheme({href:localStorage.getItem("theme")||this.themes[0].href,text:""}),setTimeout(()=>{this.changeLanguage(t)},100)}changeProfileDropdown(t){"Log Out"===t&&this.store.dispatch(new S.iM)}changeTheme(t){localStorage.setItem("theme",t.href),this.selectedTheme=t,document.getElementById("theme").href=t.href}changeLanguage(t){this.customMsgService.language=t.localeId,this.setLocale(t.localeId)}setLocale(t){this.intlService.localeId=t,localStorage.setItem("localeId",t.localeId)}onButtonClick(){this.toggle.emit()}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(c.ez),e.Y36(h.yh),e.Y36(e.soG),e.Y36(T.aJ),e.Y36(e.sBO))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-header-component"]],inputs:{selectedPage:"selectedPage"},outputs:{toggle:"toggle"},features:[e.TTD],decls:18,vars:18,consts:[[1,"header","header-bg"],[1,"nav-container"],[1,"menu-button"],[1,"k-icon","hamburger-icon",3,"click"],[1,"title"],[1,"vl"],[4,"ngIf"],[1,"settings"],["textField","locale","valueField","localeId",1,"ddl-locale",3,"data","value","popupSettings","ngClass","valueChange"],["textField","text","valueField","href",1,"ddl-theme",3,"data","value","popupSettings","ngClass","valueChange"],["kendoDropDownListValueTemplate",""],[1,"avatar-box"],["imageSrc","assets/user.jpg","shape","circle"],[3,"data","valueChange"],[1,"k-icon","k-i-palette"]],template:function(t,s){1&t&&(e.TgZ(0,"div",0),e.TgZ(1,"div",1),e.TgZ(2,"div",2),e.TgZ(3,"span",3),e.NdJ("click",function(){return s.onButtonClick()}),e.qZA(),e.qZA(),e.TgZ(4,"div",4),e.TgZ(5,"h1"),e._uU(6),e.qZA(),e._UZ(7,"span",5),e.YNc(8,k,2,1,"h2",6),e.qZA(),e.TgZ(9,"div",7),e.TgZ(10,"span"),e._uU(11),e.qZA(),e.TgZ(12,"kendo-dropdownlist",8),e.NdJ("valueChange",function(a){return s.changeLanguage(a)}),e.qZA(),e.TgZ(13,"kendo-dropdownlist",9),e.NdJ("valueChange",function(a){return s.changeTheme(a)}),e.YNc(14,w,1,0,"ng-template",10),e.qZA(),e.qZA(),e.TgZ(15,"div",11),e._UZ(16,"kendo-avatar",12),e.TgZ(17,"kendo-dropdownlist",13),e.NdJ("valueChange",function(a){return s.changeProfileDropdown(a)}),e.qZA(),e.qZA(),e.qZA(),e.qZA()),2&t&&(e.xp6(6),e.Oqu(s.customMsgService.translate("warehouse")),e.xp6(2),e.Q6J("ngIf",s.selectedPage),e.xp6(3),e.hij(" ",s.customMsgService.translate("language")," "),e.xp6(1),e.Q6J("data",s.locales)("value",s.selectedLanguage)("popupSettings",s.popupSettings)("ngClass",e.VKq(13,I,e.DdM(12,Z).includes(s.selectedTheme.text))),e.xp6(1),e.Q6J("data",s.themes)("value",s.selectedTheme)("popupSettings",s.popupSettings)("ngClass",e.VKq(16,I,e.DdM(15,Z).includes(s.selectedTheme.text))),e.xp6(4),e.Q6J("data",s.listItems))},directives:[x.O5,y.rI,x.mk,y.Cu,f.Ao],styles:[".avatar-box[_ngcontent-%COMP%]{position:relative}.avatar-box[_ngcontent-%COMP%]   kendo-dropdownlist[_ngcontent-%COMP%]{opacity:0;position:absolute;left:0;top:5px}"],changeDetection:0}),n})();class g{constructor(o,t,s,r){this.router=o,this.msgService=t,this.navigationService=s,this.cdf=r,this.expanded=!0,this.selected="",this.items=[],this.mode="push",this.mini=!0,this.isItemsLoaded=!0,this.customMsgService=this.msgService,this.items=[...this.drawerItems().map(a=>a.path&&this.router.url.includes(a.path)?(a.selected=!0,a):(a.selected=!1,a))]}ngOnInit(){this.setDrawerConfig(),window.addEventListener("resize",()=>{this.setDrawerConfig()}),this.navigationService.navigationState.subscribe(o=>{this.selected=o})}ngOnDestroy(){window.removeEventListener("resize",()=>{})}setDrawerConfig(){window.innerWidth<=770?(this.mode="overlay",this.mini=!1):(this.mode="push",this.mini=!0)}drawerItems(){return[{text:this.customMsgService.translate("dashboard"),icon:"k-i-toggle-full-screen-mode",path:"/dashboard",selected:!1},{text:this.customMsgService.translate("quotes"),icon:"k-i-book",path:"/quotes",selected:!1},{text:this.customMsgService.translate("accounting"),icon:"k-i-table-properties",path:"/accounting",selected:!1},{text:this.customMsgService.translate("crm"),icon:"k-i-folder",path:"/crm",selected:!1},{text:this.customMsgService.translate("dataLibrary"),icon:"k-i-copy",path:"/data-library",selected:!1},{text:this.customMsgService.translate("reports"),icon:"k-i-home",path:"/reports",selected:!1},{separator:!0},{text:this.customMsgService.translate("webPortal"),icon:"k-i-hyperlink-open",path:"/web-portal",selected:!1},{separator:!0},{text:this.customMsgService.translate("settings"),icon:"k-i-gear",path:"/settings",selected:!1}]}toggleDrawer(o){o.toggle()}onSelect(o){this.navigationService.navigationState.next(_.q5[o.item.text]),this.router.navigate([o.item.path])}}g.\u0275fac=function(o){return new(o||g)(e.Y36(p.F0),e.Y36(c.ez),e.Y36(l),e.Y36(e.sBO))},g.\u0275cmp=e.Xpm({type:g,selectors:[["app-common-layout"]],decls:7,vars:6,consts:[[3,"selectedPage","toggle"],[3,"items","mode","mini","expanded","animation","expandedChange","select"],["drawer",""]],template:function(o,t){if(1&o){const s=e.EpF();e.ynx(0),e.TgZ(1,"app-header-component",0),e.NdJ("toggle",function(){e.CHM(s);const a=e.MAs(4);return t.toggleDrawer(a)}),e.qZA(),e.TgZ(2,"kendo-drawer-container"),e.TgZ(3,"kendo-drawer",1,2),e.NdJ("expandedChange",function(a){return t.expanded=a})("select",function(a){return t.onSelect(a)}),e.qZA(),e.TgZ(5,"kendo-drawer-content"),e._UZ(6,"router-outlet"),e.qZA(),e.qZA(),e.BQk()}2&o&&(e.xp6(1),e.Q6J("selectedPage",t.selected),e.xp6(2),e.Q6J("items",t.items)("mode",t.mode)("mini",t.mini)("expanded",t.expanded)("animation",!1))},directives:[L,f.yw,f.hg,f.yT,p.lC],styles:[""]}),(0,d.gn)([(0,h.Ph)(v.A.isUserInit)],g.prototype,"isUserInit$",void 0)},3515:(M,C,i)=>{i.d(C,{g:()=>p});var d=i(3668),h=i(9522),v=i(6671);function _(c,u){1&c&&d._uU(0),2&c&&d.hij(" ",u.item.text," ")}const e=(c,u)=>new RegExp(`.${u}$`).test(c);let p=(()=>{class c{constructor(l){this.router=l,this.items=[]}ngOnInit(){console.log("this.router.url :>> ",this.router.url),this.router.url.includes("data-library")?this.items=[{text:"Tracing board"},{text:"Companies",items:[{text:"Customer"},{text:"Carrier"}]},{text:"Catalogues",items:[{text:"Zones",path:"data-library/zones"},{text:"Cities",path:"data-library/cities"},{text:"Countries",path:"data-library/countries"},{text:"States",path:"data-library/states"}]},{text:"Poll",items:[{text:"Poll"},{text:"Questions"}]},{text:"Taxes",items:[{text:"Consumption taxes"},{text:"Taxes"}]}]:this.router.url.includes("quotes")&&(this.items=[{text:"Quotes"},{text:"Carrier quotes"},{text:"Address classifiers"},{text:"Commodities"},{text:"RFQ"},{text:"Spot quotes"}])}onSelect({item:l}){l.items||this.router.navigate([l.path])}iconClass({text:l,items:m}){return{"k-i-file-pdf":e(l,"pdf"),"k-i-folder":void 0!==m,"k-i-html":e(l,"html"),"k-i-image":e(l,"jpg|png"),"k-icon":!0}}}return c.\u0275fac=function(l){return new(l||c)(d.Y36(h.F0))},c.\u0275cmp=d.Xpm({type:c,selectors:[["app-common-menu-layout"]],decls:3,vars:1,consts:[[3,"items","select"],["kendoMenuItemTemplate",""]],template:function(l,m){1&l&&(d.TgZ(0,"kendo-menu",0),d.NdJ("select",function(T){return m.onSelect(T)}),d.YNc(1,_,1,1,"ng-template",1),d.qZA(),d._UZ(2,"router-outlet")),2&l&&d.Q6J("items",m.items)},directives:[v.Mn,v.uc,h.lC],styles:[""]}),c})()}}]);