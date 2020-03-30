(this["webpackJsonpclockify-switch"]=this["webpackJsonpclockify-switch"]||[]).push([[0],[,,,,,,,,function(t,e,n){t.exports=n(19)},,,,,function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){"use strict";n.r(e);var r,a=n(0),o=n.n(a),i=n(7),s=n.n(i),c=(n(13),n(1)),u=n(2),l=n(3),p=n(4),h=(n(14),n(15),n(16),n(17),function(t){Object(p.a)(n,t);var e=Object(l.a)(n);function n(){return Object(c.a)(this,n),e.apply(this,arguments)}return Object(u.a)(n,[{key:"clickTask",value:function(t){this.props.onClick(),t.stopPropagation()}},{key:"render",value:function(){var t=this;return o.a.createElement("button",{className:"Task "+(this.props.active?"active":""),onClick:function(e){return t.clickTask(e)}},this.props.name)}}]),n}(o.a.Component)),d=function(t){Object(p.a)(n,t);var e=Object(l.a)(n);function n(t){var r;return Object(c.a)(this,n),(r=e.call(this,t)).state={hours:"0",minutes:"00",seconds:"00"},r}return Object(u.a)(n,[{key:"componentDidMount",value:function(){var t=this;this.interval=setInterval((function(){return t.updateTimer()}),1e3)}},{key:"componentWillUnmount",value:function(){clearInterval(this.interval)}},{key:"updateTimer",value:function(){var t=(Date.now()-new Date(this.props.start))/1e3;function e(t){return t<10?"0"+t:t}this.setState({hours:Math.floor(t/60/60),minutes:e(Math.floor(t/60%60)),seconds:e(Math.floor(t%60))})}},{key:"render",value:function(){return this.state.hours+":"+this.state.minutes+":"+this.state.seconds}}]),n}(o.a.Component),k=function(t){Object(p.a)(n,t);var e=Object(l.a)(n);function n(){return Object(c.a)(this,n),e.apply(this,arguments)}return Object(u.a)(n,[{key:"renderTasks",value:function(){var t=this;return this.props.project&&this.props.project.tasks?this.props.project.tasks.map((function(e){return t.renderTask(e)})):""}},{key:"renderTask",value:function(t){var e=this,n=this.props.runningEntry&&this.props.project.id===this.props.runningEntry.projectId&&(this.props.runningEntry.taskId===t.id||null==this.props.runningEntry.taskId&&"start"===t.id);return o.a.createElement(h,{key:t.id,name:t.name,active:n,onClick:function(){return n?e.props.stopTask():e.props.startTask(e.props.project,t)}})}},{key:"render",value:function(){var t=this,e=this.props.runningEntry&&this.props.runningEntry.projectId===this.props.project.id;return o.a.createElement("div",{className:"Project"},o.a.createElement("div",{className:"Project-body "+(e?"active":""),style:{backgroundColor:this.props.project.color},onClick:function(){return e?t.props.stopTask():t.props.startTask(t.props.project,t.props.project.tasks[0])}},o.a.createElement("div",{style:{display:"flex"}},o.a.createElement("h4",null,this.props.project.name),o.a.createElement("time",null,e&&o.a.createElement(d,{start:this.props.runningEntry.timeInterval.start}))),o.a.createElement("div",{className:"tasks"},this.renderTasks()),e&&o.a.createElement("div",{className:"Project-description"},o.a.createElement("input",{type:"text",placeholder:"Description",value:this.props.runningEntry.description||"",onChange:this.props.updateTaskDescription,onClick:function(t){return t.stopPropagation()}}))))}}]),n}(o.a.Component);function m(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return t="https://api.clockify.me/api/v1"+t,e.headers||(e.headers={}),e.headers["X-Api-Key"]=r,e.mode="cors",fetch(t,e).then((function(t){if(t.status<400)return t;throw t})).then(f)}function f(t){return t.json()}var v=function(t){Object(p.a)(n,t);var e=Object(l.a)(n);function n(t){var r;return Object(c.a)(this,n),(r=e.call(this,t)).state={runningEntry:null},r}return Object(u.a)(n,[{key:"componentDidMount",value:function(){var t=this;this.updateRunningEntry(),this.interval=setInterval((function(){return t.updateRunningEntry()}),3e4)}},{key:"componentWillUnmount",value:function(){clearInterval(this.interval)}},{key:"updateRunningEntry",value:function(){var t,e=this;(t=this.props.workspace.id,m("/user").then((function(e){return m("/workspaces/".concat(t,"/user/").concat(e.id,"/time-entries?in-progress=true")).then((function(t){return t.length?t[0]:null}))}))).then((function(t){e.setState({runningEntry:t})}))}},{key:"start",value:function(t,e){var n=this;this.setState({runningEntry:null}),function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n={start:(new Date).toISOString(),projectId:t.id,taskId:e?e.id:null};return m("/workspaces/".concat(t.workspaceId,"/time-entries"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)})}(t,e="start"===e.id?null:e).then((function(t){n.setState({runningEntry:t})}))}},{key:"stop",value:function(){this.setState({runningEntry:null}),function(t){var e={billable:t.billable,projectId:t.projectId,taskId:t.taskId,start:t.timeInterval.start,end:(new Date).toISOString()};m("/workspaces/".concat(t.workspaceId,"/time-entries/").concat(t.id),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}(this.state.runningEntry)}},{key:"updateTaskDescription",value:function(t){var e=this.state.runningEntry;e.description=t.target.value,this.setState({runningEntry:e}),function(t){var e={billable:t.billable,projectId:t.projectId,taskId:t.taskId,start:t.timeInterval.start,description:t.description};m("/workspaces/".concat(t.workspaceId,"/time-entries/").concat(t.id),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}(e)}},{key:"renderProjects",value:function(){var t=this;return this.props.workspace&&this.props.workspace.projects?this.props.workspace.projects.map((function(e){return o.a.createElement(k,{key:e.id,project:e,runningEntry:t.state.runningEntry,startTask:function(e,n){return t.start(e,n)},stopTask:function(){return t.stop()},updateTaskDescription:function(e){return t.updateTaskDescription(e)}})})):""}},{key:"render",value:function(){return o.a.createElement("div",{className:"Workspace"},o.a.createElement("div",{className:"Workspace-title"},"Workspace: ",this.props.workspace.name),o.a.createElement("div",{className:"projects"},this.renderProjects()))}}]),n}(o.a.Component),y=n(5),j=(n(18),function(t){Object(p.a)(n,t);var e=Object(l.a)(n);function n(t){var r;return Object(c.a)(this,n),(r=e.call(this,t)).state={value:""},r.handleChange=r.handleChange.bind(Object(y.a)(r)),r.handleSubmit=r.handleSubmit.bind(Object(y.a)(r)),r}return Object(u.a)(n,[{key:"handleChange",value:function(t){this.setState({value:t.target.value})}},{key:"handleSubmit",value:function(t){t.preventDefault(),this.props.onEnter(this.state.value)}},{key:"render",value:function(){return o.a.createElement("form",{className:"EnterApiKey",onSubmit:this.handleSubmit},o.a.createElement("label",null,o.a.createElement("p",null,"Please enter your Clockify API Key:"),o.a.createElement("input",{type:"text",value:this.state.value,onChange:this.handleChange,placeholder:"API Key"}),o.a.createElement("p",{className:"right"},o.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://clockify.me/user/settings"},"Get it here."))),o.a.createElement("input",{className:"submit",type:"submit",value:"Submit"}))}}]),n}(o.a.Component)),E=function(t){Object(p.a)(n,t);var e=Object(l.a)(n);function n(t){var r;return Object(c.a)(this,n),(r=e.call(this,t)).state={workspaces:[],apiToken:localStorage.getItem("ClockifyApiToken")},r}return Object(u.a)(n,[{key:"componentDidMount",value:function(){this.state.apiToken&&this.onEnterApiKey(this.state.apiToken)}},{key:"componentWillUnmount",value:function(){clearInterval(this.interval)}},{key:"onEnterApiKey",value:function(t){var e=this;(function(t){return r=t,m("/user").then((function(){return r})).catch((function(t){throw r=null,t}))})(t).then((function(){localStorage.setItem("ClockifyApiToken",t),e.setState({apiToken:t}),e.loadWorkspaces(),e.interval=setInterval((function(){return e.loadWorkspaces()}),6e5)})).catch((function(){}))}},{key:"loadWorkspaces",value:function(){var t=this;return function(){return r?m("/workspaces").then((function(e){return t=e,Promise.all(e.map((function(t){return m("/workspaces/".concat(t.id,"/projects?archived=false")).then((function(e){return t.projects=e,Promise.all(e.map((function(e){return m("/workspaces/".concat(t.id,"/projects/").concat(e.id,"/tasks")).then((function(t){e.tasks=t;e.tasks.unshift({id:"start",name:"Start",active:!1})}))})))}))})))})).then((function(){return t})):Promise.resolve([]);var t}().then((function(e){return t.setState({workspaces:e}),e}))}},{key:"logout",value:function(){localStorage.removeItem("ClockifyApiToken"),window.location.reload()}},{key:"renderSpaces",value:function(){return this.state.workspaces.map((function(t){return o.a.createElement(v,{key:t.id,workspace:t})}))}},{key:"render",value:function(){var t=this,e=o.a.createElement("button",{className:"App-logout",onClick:this.logout},"Logout"),n=o.a.createElement(j,{onEnter:function(e){return t.onEnterApiKey(e)}});return o.a.createElement("div",{className:"App"},o.a.createElement("header",{className:"App-header"},o.a.createElement("h1",null,"Clockify Switch"),this.state.apiToken?[this.renderSpaces(),e]:n))}}]),n}(o.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(E,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}],[[8,1,2]]]);
//# sourceMappingURL=main.1d045be1.chunk.js.map