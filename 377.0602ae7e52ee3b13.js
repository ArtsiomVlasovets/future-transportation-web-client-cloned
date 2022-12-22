"use strict";(self.webpackChunkfuture_transportation_web_client=self.webpackChunkfuture_transportation_web_client||[]).push([[377],{8377:(D,C,a)=>{a.r(C),a.d(C,{AuthModule:()=>q});var Z=a(6687),x=a(6019),t=a(3668);let T=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[[x.ez]]}),e})();var p=a(7168),f=a(9522),I=a(4762),w=a(1569),A=a(8805),u=a(9814);function k(e=250,o=250){return(0,u.X$)("fadeInOut",[(0,u.eR)("void => *",[(0,u.oB)({opacity:0}),(0,u.jt)(e,(0,u.oB)({opacity:1}))]),(0,u.eR)("* => void",[(0,u.jt)(o,(0,u.oB)({opacity:0}))])])}var b=a(2754),N=a(3405);let M=(()=>{class e{constructor(){this.componentDestroyed=new N.xQ,this.componentDestroyed$=this.componentDestroyed.asObservable()}ngOnDestroy(){this.componentDestroyed.next(),this.componentDestroyed.complete()}}return e.\u0275fac=function(n){return new(n||e)},e.\u0275dir=t.lG2({type:e}),e})();var U=a(6087),P=a(5722);let F=(()=>{class e extends M{ngOnInit(){this.initFrom()}hasUnsavedChanges(){return this.form.dirty}handleUnsavedChanges(n="You have unsaved changes"){(0,U.R)(window,"beforeunload").pipe((0,P.b)(s=>this.form.dirty?(s.preventDefault(),s.returnValue=!1,n):null),(0,A.R)(this.componentDestroyed$)).subscribe()}}return e.\u0275fac=function(){let o;return function(s){return(o||(o=t.n5z(e)))(s||e)}}(),e.\u0275cmp=t.Xpm({type:e,selectors:[["ng-component"]],features:[t.qOj],decls:0,vars:0,template:function(n,s){},encapsulation:2}),e})();var r=a(9133),y=a(7245),g=a(1718),v=a(6741);class d{static URLFormatValidator(){return this.pattern({pattern:d.URL_PATTERN,message:"Wrong URL format"})}static restrictedCharactersPattern(o){const n=new RegExp(`^[^${o.join("")}]+$`);return this.pattern({pattern:n,message:`${o.join(" ")} characters are not allowed.`})}static pattern(o){return n=>n.value&&!n.value.match(o.pattern)?{customPattern:{pattern:o.pattern,message:o.message}}:null}static positiveInteger(o){const n=new Array(o).fill(9).join(""),s=Number(n);return r.kI.compose([r.kI.min(0),r.kI.max(s)])}static shouldMatch(o,n,s="Should match"){return i=>{const l=i.controls[n];return l.errors&&!l.errors.mustMatch||l.setErrors(i.controls[o].value!==l.value?{mustMatch:{message:s}}:null),null}}static atLeastOneHasValue(o,n=!0){return s=>o.some(c=>{var l;return(null===(l=s.get(c))||void 0===l?void 0:l.value)===n})?null:{atLeastOneHasValue:!0}}}d.URL_PATTERN=new RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$","i"),d.minAllowedYear=1900,d.currentYearUTC=(new Date).getUTCFullYear();class m extends F{constructor(o,n,s,i){super(),this.store=o,this.route=n,this.fb=s,this.cdr=i,this.emailFromRoute=this.route.snapshot.queryParamMap.get(w.b.Email),this.carrierId=this.route.snapshot.queryParamMap.get(w.b.CarrierId),this.routeNames=p.x,this.phoneNumberMask="000-000-0000",this.phoneNumberPlaceholder="123-456-7890",this.tenOptionalNumbersMask="9999999999",this.formControlsNames={email:"email",password:"password",passwordConfirmation:"passwordConfirmation",phone:"phone",carrierMcNumber:"carrierMcNumber"},this.type="",this.uuid="",this.isParamsInit=!1,this.userInfo={companyType:"",email:""}}get carrierIdIsUnknown(){return null===this.carrierId}ngAfterViewInit(){this.authTypeInit()}onFormSubmit(){this.form.invalid?this.form.markAllAsTouched():this.signUp()}initFrom(){var o,n;this.form=this.fb.group({[this.formControlsNames.email]:new r.NI(this.emailFromRoute||(null===(o=this.userInfo)||void 0===o?void 0:o.email),[r.kI.required,r.kI.email]),[this.formControlsNames.password]:new r.NI(b.v6,[r.kI.required,r.kI.minLength(4)]),[this.formControlsNames.passwordConfirmation]:new r.NI(b.v6,[r.kI.required,r.kI.minLength(4)])}),this.carrierIdIsUnknown&&!(null===(n=this.userInfo)||void 0===n?void 0:n.companyType)&&(this.form.addControl(this.formControlsNames.phone,new r.NI(null,[r.kI.required,r.kI.maxLength(50)])),this.form.addControl(this.formControlsNames.carrierMcNumber,new r.NI(null,[r.kI.maxLength(10)]))),this.addPasswordConfirmationValidation()}addPasswordConfirmationValidation(){this.form.setValidators(d.shouldMatch(this.formControlsNames.password,this.formControlsNames.passwordConfirmation,"Passwords should match")),this.form.updateValueAndValidity()}signUp(){this.store.dispatch(new y.Qd(this.form.value[this.formControlsNames.email],this.form.value[this.formControlsNames.password],this.form.value[this.formControlsNames.phone],this.form.value[this.formControlsNames.carrierMcNumber],this.carrierId,this.uuid))}authTypeInit(){this.route.queryParams.subscribe(o=>{this.type=o.type,this.uuid=o.uuid,this.type&&this.uuid?this.store.dispatch(new y.W1(this.type,this.uuid)).pipe((0,A.R)(this.componentDestroyed$)).subscribe(()=>{const n=this.store.selectSnapshot(v.A.getuserInfo);this.userInfo=Object.assign({},n),this.isParamsInit=!0,super.ngOnInit(),this.cdr.markForCheck()}):(this.isParamsInit=!0,super.ngOnInit(),this.cdr.markForCheck())})}}m.\u0275fac=function(o){return new(o||m)(t.Y36(g.yh),t.Y36(f.gz),t.Y36(r.qu),t.Y36(t.sBO))},m.\u0275cmp=t.Xpm({type:m,selectors:[["ftwp-sign-up-page"]],features:[t.qOj],decls:0,vars:0,template:function(o,n){},encapsulation:2,data:{animation:[k()]},changeDetection:0}),(0,I.gn)([(0,g.Ph)(v.A.getuserInfo)],m.prototype,"userInfo$",void 0),(0,I.gn)([(0,g.Ph)(v.A.getSignInIsLoading)],m.prototype,"isLoading$",void 0);let B=(()=>{class e{constructor(){}ngOnInit(){}}return e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=t.Xpm({type:e,selectors:[["ftwp-auth-common-layout"]],decls:2,vars:0,consts:[[1,"layout-container"]],template:function(n,s){1&n&&(t.TgZ(0,"div",0),t._UZ(1,"router-outlet"),t.qZA())},directives:[f.lC],styles:[""],changeDetection:0}),e})();var S=a(432),h=a(5981),O=a(6820),L=a(8355);const R=["password"];function V(e,o){if(1&e){const n=t.EpF();t.TgZ(0,"button",19),t.NdJ("click",function(){return t.CHM(n),t.oxw().toggleVisibility()}),t.qZA()}}const J=[{path:"",component:B,children:[{path:"",pathMatch:"full",redirectTo:p.x.SignIn},{path:p.x.SignUp,component:m},{path:p.x.SignIn,component:(()=>{class e{constructor(n){this.store=n,this.form=new r.cw({username:new r.NI,password:new r.NI,loggedin:new r.NI})}get isValidForm(){return this.form.controls.username.valid&&this.form.controls.password.valid}signIn(n,s){this.store.dispatch(new y.j0({username:n,password:s}))}ngAfterViewInit(){this.textbox.input.nativeElement.type="password"}toggleVisibility(){const n=this.textbox.input.nativeElement;n.type="password"===n.type?"text":"password"}login(){this.form.markAllAsTouched(),this.isValidForm&&this.signIn(this.form.controls.username.value,this.form.controls.password.value)}clearForm(){this.form.reset()}}return e.\u0275fac=function(n){return new(n||e)(t.Y36(g.yh))},e.\u0275cmp=t.Xpm({type:e,selectors:[["ftwp-sign-in-page"]],viewQuery:function(n,s){if(1&n&&t.Gf(R,5),2&n){let i;t.iGM(i=t.CRH())&&(s.textbox=i.first)}},decls:35,vars:7,consts:[[1,"example"],[1,"k-form",3,"formGroup"],[1,"k-form-fieldset"],[1,"k-form-legend"],["initials","FT","width","80px","height","80px","shape","circle"],["text","Username",3,"for"],["formControlName","username","required","",3,"clearButton"],["username",""],["text","Password",3,"for"],["formControlName","password","required","",3,"clearButton"],["password",""],["kendoTextBoxSuffixTemplate",""],[1,"k-checkbox-wrap"],["type","checkbox","kendoCheckBox","","formControlName","loggedin"],["loggedin",""],["text","Keep me logged in",1,"k-checkbox-label",3,"for"],[1,"k-form-buttons"],["kendoButton","","themeColor","primary",3,"disabled","click"],["kendoButton","",3,"click"],["kendoButton","","look","clear","icon","eye",3,"click"]],template:function(n,s){if(1&n&&(t.TgZ(0,"div",0),t.TgZ(1,"form",1),t.TgZ(2,"fieldset",2),t.TgZ(3,"legend",3),t._uU(4,"Sign In"),t.qZA(),t._UZ(5,"kendo-avatar",4),t.TgZ(6,"kendo-formfield"),t._UZ(7,"kendo-label",5),t._UZ(8,"kendo-textbox",6,7),t.TgZ(10,"kendo-formhint"),t._uU(11,"Your Username"),t.qZA(),t.TgZ(12,"kendo-formerror"),t._uU(13,"Error: Username is required"),t.qZA(),t.qZA(),t.TgZ(14,"kendo-formfield"),t._UZ(15,"kendo-label",8),t.TgZ(16,"kendo-textbox",9,10),t.YNc(18,V,1,0,"ng-template",11),t.qZA(),t.TgZ(19,"kendo-formhint"),t._uU(20,"Your password"),t.qZA(),t.TgZ(21,"kendo-formerror"),t._uU(22,"Error: Password is required"),t.qZA(),t.qZA(),t.TgZ(23,"kendo-formfield"),t.TgZ(24,"div",12),t._UZ(25,"input",13,14),t._UZ(27,"kendo-label",15),t.qZA(),t.TgZ(28,"kendo-formhint"),t._uU(29,"Next time, you will be logged in automatically"),t.qZA(),t.qZA(),t.TgZ(30,"div",16),t.TgZ(31,"button",17),t.NdJ("click",function(){return s.login()}),t._uU(32," Login "),t.qZA(),t.TgZ(33,"button",18),t.NdJ("click",function(){return s.clearForm()}),t._uU(34,"Clear"),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA()),2&n){const i=t.MAs(9),c=t.MAs(17),l=t.MAs(26);t.xp6(1),t.Q6J("formGroup",s.form),t.xp6(6),t.Q6J("for",i),t.xp6(1),t.Q6J("clearButton",!0),t.xp6(7),t.Q6J("for",c),t.xp6(1),t.Q6J("clearButton",!0),t.xp6(11),t.Q6J("for",l),t.xp6(4),t.Q6J("disabled",!s.isValidForm)}},directives:[r._Y,r.JL,r.sg,S.Ao,h.hg,O._n,h.PL,r.JJ,r.u,r.Q7,h.Mu,h.qz,h.d6,r.Wl,h.wd,L.Hq],styles:["[_nghost-%COMP%]{height:100vh;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center}[_nghost-%COMP%]     .mat-card-header{margin-right:-20px}.form-submit[_ngcontent-%COMP%]{display:block;width:100%;margin-top:var(--spacing-lg)}.k-avatar[_ngcontent-%COMP%]{margin-left:80px;font-size:30px}.example[_ngcontent-%COMP%]{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center}.k-form[_ngcontent-%COMP%]{width:240px}"],data:{animation:[k()]},changeDetection:0}),e})()}]}];let j=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[[f.Bz.forChild(J)],f.Bz]}),e})(),z=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({}),e})(),q=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[[x.ez,j,r.UX,Z.m,z,T]]}),e})()}}]);