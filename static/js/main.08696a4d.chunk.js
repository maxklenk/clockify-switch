(this["webpackJsonpclockify-switch"]=this["webpackJsonpclockify-switch"]||[]).push([[0],[,,,,,,,function(t,e,n){t.exports=n(19)},,,,,function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){"use strict";n.r(e);var r,a=n(0),i=n.n(a),s=n(6),o=n.n(s),c=(n(12),n(1)),u=n(2),p=n(3),l=n(4),h=(n(13),n(14),n(15),n(16),function(t){Object(l.a)(n,t);var e=Object(p.a)(n);function n(){return Object(c.a)(this,n),e.apply(this,arguments)}return Object(u.a)(n,[{key:"clickTask",value:function(t){this.props.onClick(),t.stopPropagation()}},{key:"render",value:function(){var t=this;return i.a.createElement("button",{className:"Task "+(this.props.active&&"active"),onClick:function(e){return t.clickTask(e)}},this.props.name)}}]),n}(i.a.Component)),d=(n(17),function(t){Object(l.a)(n,t);var e=Object(p.a)(n);function n(){return Object(c.a)(this,n),e.apply(this,arguments)}return Object(u.a)(n,[{key:"clickTask",value:function(t){this.props.onClick(),t.stopPropagation()}},{key:"render",value:function(){var t=this;return i.a.createElement("button",{className:"Tag "+(this.props.active&&"active"),onClick:function(e){return t.clickTask(e)}},this.props.name)}}]),n}(i.a.Component)),k=function(t){Object(l.a)(n,t);var e=Object(p.a)(n);function n(t){var r;return Object(c.a)(this,n),(r=e.call(this,t)).interval=null,r.state={hours:"0",minutes:"00",seconds:"00"},r}return Object(u.a)(n,[{key:"componentDidMount",value:function(){var t=this;this.interval=setInterval((function(){return t.updateTimer()}),1e3)}},{key:"componentWillUnmount",value:function(){this.interval&&clearInterval(this.interval)}},{key:"updateTimer",value:function(){var t=+new Date(this.props.start),e=(Date.now()-t)/1e3;function n(t){return t<10?"0"+t:t.toString(10)}this.setState({hours:Math.floor(e/60/60).toString(),minutes:n(Math.floor(e/60%60)),seconds:n(Math.floor(e%60))})}},{key:"render",value:function(){return this.state.hours+":"+this.state.minutes+":"+this.state.seconds}}]),n}(i.a.Component),v=function(t){Object(l.a)(n,t);var e=Object(p.a)(n);function n(){return Object(c.a)(this,n),e.apply(this,arguments)}return Object(u.a)(n,[{key:"renderTasks",value:function(){var t=this;return this.props.project&&this.props.project.tasks?this.props.project.tasks.map((function(e){return t.renderTask(e)})):""}},{key:"renderTask",value:function(t){var e=this,n=!!this.props.runningEntry&&this.props.project.id===this.props.runningEntry.projectId&&(this.props.runningEntry.taskId===t.id||null==this.props.runningEntry.taskId&&"start"===t.id);return i.a.createElement(h,{key:t.id,name:t.name,active:n,onClick:function(){return n?e.props.stopTask():e.props.startTask(e.props.project,t)}})}},{key:"renderTags",value:function(){var t=this;if(!this.props.workspace||!this.props.workspace.tags)return"";var e=!!this.props.runningEntry&&this.props.runningEntry.projectId===this.props.project.id;return this.props.workspace.tags.map((function(n){var r=e&&!!t.props.runningEntry&&t.props.runningEntry.tagIds&&-1!==t.props.runningEntry.tagIds.indexOf(n.id);return i.a.createElement(d,{key:n.id,name:n.name,active:r,onClick:function(){t.props.setTag(t.props.project,n)}})}))}},{key:"render",value:function(){var t=this,e=!!this.props.runningEntry&&this.props.runningEntry.projectId===this.props.project.id;return i.a.createElement("div",{className:"Project"},i.a.createElement("div",{className:"Project-body "+(e?"active":""),style:{backgroundColor:this.props.project.color},onClick:function(){return e?t.props.stopTask():t.props.startTask(t.props.project,null)}},i.a.createElement("div",{style:{display:"flex"}},i.a.createElement("h4",null,this.props.project.name),i.a.createElement("time",null,e&&this.props.runningEntry&&i.a.createElement(k,{start:this.props.runningEntry.timeInterval.start}))),i.a.createElement("div",{className:"Project-tasks"},i.a.createElement("button",{className:"Task",onClick:function(){return e?t.props.stopTask():t.props.startTask(t.props.project,{id:"start"})}},this.props.runningEntry?e?"Stop":"Switch":"Start"),this.renderTasks()),e&&i.a.createElement("div",{className:"Project-description"},i.a.createElement("input",{type:"text",placeholder:"Description",value:this.props.runningEntry&&this.props.runningEntry.description||"",onChange:function(e){return t.props.typeTaskDescription(e)},onBlur:function(e){return t.props.updateTaskDescription(e)},onClick:function(t){return t.stopPropagation()}})),i.a.createElement("div",{className:"Project-tags"},this.renderTags())))}}]),n}(i.a.Component);function f(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,r={tagIds:n&&[n.id],billable:t.billable,taskId:e?e.id:null,projectId:t.id,start:(new Date).toISOString()};return y("/workspaces/".concat(t.workspaceId,"/time-entries"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)})}function m(t){var e={description:t.description,tagIds:t.tagIds,billable:t.billable,taskId:t.taskId,projectId:t.projectId,start:t.timeInterval.start,end:t.timeInterval.end};return y("/workspaces/".concat(t.workspaceId,"/time-entries/").concat(t.id),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}function y(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return t="https://api.clockify.me/api/v1"+t,e.headers||(e.headers={}),e.headers["X-Api-Key"]=r,e.mode="cors",fetch(t,e).then((function(t){if(t.status<400)return t;throw t})).then(g)}function g(t){return t.json()}var E=function(t){Object(l.a)(n,t);var e=Object(p.a)(n);function n(){var t;Object(c.a)(this,n);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return(t=e.call.apply(e,[this].concat(a))).interval=void 0,t.state={runningEntry:null},t}return Object(u.a)(n,[{key:"componentDidMount",value:function(){var t=this;this.updateRunningEntry(),this.interval=setInterval((function(){return t.updateRunningEntry()}),3e4)}},{key:"componentWillUnmount",value:function(){this.interval&&clearInterval(this.interval)}},{key:"updateRunningEntry",value:function(){var t,e=this;(t=this.props.workspace.id,y("/user").then((function(e){return y("/workspaces/".concat(t,"/user/").concat(e.id,"/time-entries?in-progress=true")).then((function(t){return t.length?t[0]:null}))}))).then((function(t){e.setState({runningEntry:t})}))}},{key:"start",value:function(t){var e=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;this.setState({runningEntry:null}),f(t,n=n&&"start"===n.id?null:n,r).then((function(t){e.setState({runningEntry:t})}))}},{key:"stop",value:function(){this.state.runningEntry&&function(t){var e={description:t.description,tagIds:t.tagIds,billable:t.billable,taskId:t.taskId,projectId:t.projectId,start:t.timeInterval.start,end:(new Date).toISOString()};y("/workspaces/".concat(t.workspaceId,"/time-entries/").concat(t.id),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}(this.state.runningEntry),this.setState({runningEntry:null})}},{key:"typeTaskDescription",value:function(t){if(this.state.runningEntry){var e=this.state.runningEntry;e.description=t.target.value,this.setState({runningEntry:e})}}},{key:"updateTaskDescription",value:function(){this.state.runningEntry&&m(this.state.runningEntry)}},{key:"setTag",value:function(t,e){if(this.state.runningEntry&&this.state.runningEntry.projectId===t.id){var n=this.state.runningEntry;n.tagIds||(n.tagIds=[]);var r=n.tagIds.indexOf(e.id);-1!==r?n.tagIds.splice(r,1):n.tagIds.push(e.id),this.setState({runningEntry:n}),m(n)}else this.start(t,null,e)}},{key:"renderProjects",value:function(){var t=this;return this.props.workspace&&this.props.workspace.projects?this.props.workspace.projects.map((function(e){return i.a.createElement(v,{key:e.id,workspace:t.props.workspace,project:e,runningEntry:t.state.runningEntry,startTask:function(e,n){return t.start(e,n)},stopTask:function(){return t.stop()},updateTaskDescription:function(){return t.updateTaskDescription()},typeTaskDescription:function(e){return t.typeTaskDescription(e)},setTag:function(e,n){return t.setTag(e,n)}})})):""}},{key:"render",value:function(){return i.a.createElement("div",{className:"Workspace"},i.a.createElement("div",{className:"Workspace-title"},"Workspace: ",this.props.workspace.name),i.a.createElement("div",{className:"projects"},this.renderProjects()))}}]),n}(i.a.Component),j=(n(18),function(t){Object(l.a)(n,t);var e=Object(p.a)(n);function n(t){var r;return Object(c.a)(this,n),(r=e.call(this,t)).state={value:""},r}return Object(u.a)(n,[{key:"handleChange",value:function(t){this.setState({value:t.target.value})}},{key:"handleSubmit",value:function(t){t.preventDefault(),this.props.onEnter(this.state.value)}},{key:"render",value:function(){var t=this;return i.a.createElement("form",{className:"EnterApiKey",onSubmit:function(e){return t.handleSubmit(e)}},i.a.createElement("label",null,i.a.createElement("p",null,"Please enter your Clockify API Key:"),i.a.createElement("input",{type:"text",value:this.state.value,onChange:function(e){return t.handleChange(e)},placeholder:"API Key"}),i.a.createElement("p",{className:"right"},i.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://clockify.me/user/settings"},"Get it here."))),i.a.createElement("input",{className:"submit",type:"submit",value:"Submit"}))}}]),n}(i.a.Component)),b=function(t){Object(l.a)(n,t);var e=Object(p.a)(n);function n(){var t;Object(c.a)(this,n);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return(t=e.call.apply(e,[this].concat(a))).interval=void 0,t.state={workspaces:[],apiToken:localStorage.getItem("ClockifyApiToken")},t}return Object(u.a)(n,[{key:"componentDidMount",value:function(){this.state.apiToken&&this.onEnterApiKey(this.state.apiToken)}},{key:"componentWillUnmount",value:function(){this.interval&&clearInterval(this.interval)}},{key:"onEnterApiKey",value:function(t){var e=this;(function(t){return r=t,y("/user").then((function(){return r})).catch((function(t){throw r=null,t}))})(t).then((function(){localStorage.setItem("ClockifyApiToken",t),e.setState({apiToken:t}),e.loadWorkspaces(),e.interval=setInterval((function(){return e.loadWorkspaces()}),6e5)})).catch((function(){}))}},{key:"loadWorkspaces",value:function(){var t=this;return function(){return r?y("/workspaces").then((function(e){return t=e,Promise.all(e.map((function(t){var e=y("/workspaces/".concat(t.id,"/tags")).then((function(e){return t.tags=e,e})),n=y("/workspaces/".concat(t.id,"/projects?archived=false")).then((function(e){return t.projects=e,Promise.all(e.map((function(e){return y("/workspaces/".concat(t.id,"/projects/").concat(e.id,"/tasks")).then((function(t){e.tasks=t}))})))}));return Promise.all([e,n])})))})).then((function(){})).then((function(){return t})):Promise.resolve([]);var t}().then((function(e){return t.setState({workspaces:e}),e}))}},{key:"logout",value:function(){localStorage.removeItem("ClockifyApiToken"),window.location.reload()}},{key:"renderSpaces",value:function(){return this.state.workspaces.map((function(t){return i.a.createElement(E,{key:t.id,workspace:t})}))}},{key:"render",value:function(){var t=this,e=i.a.createElement("button",{className:"App-logout",onClick:this.logout},"Logout"),n=i.a.createElement(j,{onEnter:function(e){return t.onEnterApiKey(e)}});return i.a.createElement("div",{className:"App"},i.a.createElement("header",{className:"App-header"},i.a.createElement("h1",null,"Clockify Switch"),this.state.apiToken&&this.renderSpaces(),this.state.apiToken&&e,!this.state.apiToken&&n))}}]),n}(i.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(b,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}],[[7,1,2]]]);
//# sourceMappingURL=main.08696a4d.chunk.js.map