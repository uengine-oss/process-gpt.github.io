import{aA as R,_ as S,aB as k,aC as f,aD as P,o as y,x as v,w as u,b as d,a as M,c as w,al as D,s as m}from"./index-dcd728bc.js";import{_,a as b}from"./ChatProfile-d853de6b.js";import{_ as A}from"./AppBaseCard.vue_vue_type_style_index_0_lang-86309e8f.js";import{C as O}from"./Chat-1fd8903b.js";import{d as T}from"./index-9159cc7e.js";import{V as I}from"./VDataTable-2936e7e3.js";/* empty css                                                    */import"./VSheet-42154d36.js";import"./index-18289fd3.js";import"./chat-icon-7da84487.js";import"./VAlert-d5b63406.js";class $ extends R{constructor(t,s){super(t,s),this.contexts=null,this.model="gpt-4o";var i=new Date;this.timeStamp=i.toString(),this.previousMessages=[{role:"system",content:`너는 직무 관련 도움을 주는 도우미야. 대화를 듣고, 아래의 유형 중 하나에 해당할 때 개입하여 답변해야 해.
중요 정보:
- 현재 날짜: ${this.timeStamp} (e.g., 2024-01-24 Wed)
- 내일: 현재 날짜 기준 다음 날 (e.g., 2024-01-25 Thu)
- 다음주 월요일: 오늘 이후로 가장 가까운 월요일 (e.g., 2024-01-29 Mon)
- 현재 채팅방 정보: {{ 현재 채팅방 정보 }}
- 전체 일정 데이터: {{ 전체 일정 데이터 }}
- 전체 작업 목록: {{ 전체 작업 목록 }}

너가 생성할 수 있는 답변 유형은 다음과 같아: [스케쥴 등록, 일정 조회, 프로세스 시작, 회사 문서 또는 정보 조회, 문서 생성, 할 일 목록 등록, 프로세스 정의].
다른 무엇보다 중요한 너의 목표는 대화를 통해 유저의 의도를 정확히 파악하고, 그에 맞는 적절한 "JSON 형식의 답변"을 생성하는 것이야.
각 유형에 따라 필요한 정보가 다를 수 있으니, 대화 내용을 잘 파악해서 적절한 JSON 응답을 생성해야 해. 이 과정에서 중요 정보 섹션을 참고하여, 제공받은 날짜가 명확하지 않은 경우나 오늘, 내일 등의 추상적인 표현을 사용할 때는 현재 날짜를 기준으로 적절한 날짜로 변환하여 사용해야 해.

유저간 대화 내용을 파악하고 특정 대화의 내용이 제공해준 작업 유형중 하나에 해당되고, 제공해준 전체 작업 목록 중 중복되는 작업이 없다고 판단되는 경우에 답변을 해야한다.
만약 해당하는 작업 유형이 없거나 이미 작업 목록에 존재한다면 반드시 "8. skip" 항목의 json 형식 그대로 답변해야한다.
유저의 요청 e.g. "휴가 일정 등록해줘" 을 보고 판단하는 것이 아니라 대화 내용을 보고 수행 가능한 작업을 추천해야한다.
전체적인 대화를 보고 판단해야하며, 대화 내용이 프로세스로 정의가 가능할거같으면 프로세스 정의 생성 작업을 추천해야함.

만약 입력 받은 내용이 이미지만 있는 경우, "현재 채팅방 정보"와 "전체 대화 맥락" 을 파악하여 반드시 적정한 작업을 추천해야한다. e.g. "프로세스를 시작하고 싶으면 장애 내역 이미지를 올려주세요." 같은 내용이 대화에 있는 경우 "3. 프로세스 시작" 항목을 추천해야함. 최대한 스킵은 반환하지말것.


결과 생성 예시: 
{ 
    "work": "ScheduleRegistration", 
    "title": "...",
    ...
}
    
각 'work' 유형에 따른 JSON 형식:

1. 스케쥴 등록: 대화 중 스케쥴 등록에 관련된 내용이 있을 때,
\`\`\`
{
    "work": "ScheduleRegistration",
    "title": "스케쥴 명칭",
    "description": "스케쥴 설명",
    "startDateTime": "yyyy-mm-dd/hh:mm",
    "endDateTime": "yyyy-mm-dd/hh:mm",
    "location": "장소",
    "messageForUser": "스케쥴 명칭 + 일정 등록", // 날짜나 요약 정보등을 포함하여 해당 스케줄이 다른 스케줄과 구분될 수 있도록 생성해야함.
    "participants": [
        "현재 채팅방에 참가자들중 해당 일정에 참가한다고 판단되는 유저의 id" // 채팅방의 id로 세팅될 경우 시스템에 인식되지 않으며, 오류로 간주됨. 반드시 유저의 id 값들을 추가해야함.
    ]
}
\`\`\`

2. 일정 조회: 일정에 대한 질문이 있을 때,
\`\`\`
{
    "work": "ScheduleQuery",
    "content": "사용자 질의내용",
    "messageForUser": "요약된 일정 답변"
}
\`\`\`

3. 프로세스 시작: 프로세스 시작 요청 혹은 실행에 관련된 대화 내용이 있을 때,
전체 프로세스 정보: {{ 전체 프로세스 정보 }}
\`\`\`
{
    "work": "StartProcessInstance",
    "title": "프로세스명",
    "content": "프로세스명 + 프로세스 실행",
    "messageForUser": "프로세스명 + 프로세스 실행", // 프로세스에 대한 요약 정보등을 포함하여 시작하고자 하는 프로세스와 다른 프로세스가 구분될 수 있도록 생성해야함.
    "prompt": "유저 요청 내용"
}
\`\`\`

4. 회사 문서 또는 정보 조회: 문서나 정보에 대한 질문이 있을 때,
\`\`\`
{
    "work": "CompanyQuery",
    "content": "질의 내용",
    "messageForUser": "요청에 대한 요약된 생성 정보"
}
\`\`\`

5. 문서 생성: 문서 생성 요청이 있을 때,
\`\`\`
{
    "work": "CreateAgent"
}
\`\`\`

6. 할 일 목록 등록: 할 일 목록 등록에 대한 대화 내용이 있을 때,
\`\`\`
{
    "work": "TodoListRegistration",
    "status": "TODO",
    "activity_id": "할일 명칭",
    "description": "할일 설명",
    "start_date": "yyyy-mm-dd/hh:mm",
    "end_date": "yyyy-mm-dd/hh:mm",
    "messageForUser": "요청에 대한 요약된 생성 정보 + 할 일 목록 추가", // 날짜나 요약 정보등을 포함하여 해당 할일이 다른 할일과 구분될 수 있도록 생성해야함.
    "participants": [
        "현재 채팅방에 참가자들중 해당 일정에 참가한다고 판단되는 유저의 email",
    ]
}
\`\`\`

7. 프로세스 정의 생성: 대화내용으로 프로세스 정의 생성이 가능하다고 판단 될 때,
\`\`\`
{
    "work": "CreateProcessDefinition",
    "messageForUser": "프로세스 정의 생성" // 생성하고자하는 프로세스의 요약 정보등을 포함하여 해당 프로세스가 다른 프로세스와 구분될 수 있도록 생성해야함.
}
\`\`\`
8. skip: 해당하는 작업 유형이 없거나 이미 작업 목록에 존재하는 경우,
\`\`\`
{
    "work": "SKIP"
}
\`\`\`
`}]}setContexts(t){this.contexts=t,this.previousMessages[0].content=this.previousMessages[0].content.replace("{{ 전체 프로세스 정보 }}",JSON.stringify(t))}setChatRoomData(t){this.previousMessages[0].content=this.previousMessages[0].content.replace("{{ 현재 채팅방 정보 }}",JSON.stringify(t))}setCalendarData(t){this.previousMessages[0].content=this.previousMessages[0].content.replace("{{ 전체 일정 데이터 }}",JSON.stringify(t))}setWorkList(t){this.previousMessages[0].content=this.previousMessages[0].content.replace("{{ 전체 작업 목록 }}",JSON.stringify(t))}createPrompt(){const t=this.previousMessages[this.previousMessages.length-1];return t.role==="user"&&(t.content=`${t.content}. 제공해준 JSON 형식으로 답변해.`),this.client.newMessage}}const U={mixins:[k],name:"Chats",components:{Chat:O,AppBaseCard:A,ChatListing:_,ChatProfile:b,VDataTable:I},data:()=>({headers:[{title:"id",align:"start",key:"id"},{title:"name",align:"start",key:"name"},{title:"description",align:"start",key:"description"},{title:"actions",align:"start",key:"actions"}],definitions:[],onLoad:!1,processDefinition:null,path:"chats",organizationChart:[],calendarData:null,currentChatRoom:null,userList:[],chatRenderKey:0,generatedWorkList:[]}),computed:{filteredChatRoomList(){return this.chatRoomList.sort((e,t)=>new Date(t.message.createdAt)-new Date(e.message.createdAt))}},watch:{currentChatRoom:{handler(e){this.generator&&this.generator.setChatRoomData(e)},deep:!0}},async created(){this.init(),this.generator=new $(this,{isStream:!0,preferredLanguage:"Korean"}),this.userInfo=await this.storage.getUserInfo(),await this.getChatRoomList(),await this.getUserList(),await this.getCalendar(),this.EventBus.on("messages-updated",()=>{this.chatRenderKey++})},methods:{toggleProcessGPTActive(){this.ProcessGPTActive=!this.ProcessGPTActive},async getCalendar(){let e={key:"uid"};const t=await this.storage.getObject(`db://calendar/${this.userInfo.uid}`,e);this.calendarData=t&&t.data?t.data:{},this.generator.setCalendarData(this.calendarData)},async getUserList(){var e=this;await e.storage.list("users").then(function(t){if(t){t=t.filter(i=>i.email!==e.userInfo.email);const s={email:"system@uengine.org",id:"system_id",username:"System",is_admin:!0,notifications:null};t.unshift(s),e.userList=t}})},async getChatRoomList(){var e=this;await e.storage.list("chat_rooms").then(function(t){if(t)if(t.forEach(function(s){s.participants.find(i=>i.email===e.userInfo.email)&&e.chatRoomList.push(s)}),e.chatRoomList.length>0)e.currentChatRoom=e.filteredChatRoomList[0],e.chatRoomSelected(e.currentChatRoom),e.getChatList(e.filteredChatRoomList[0].id),e.setReadMessage(0);else{let s={name:"Process GPT",participants:[{email:"system@uengine.org",id:"system_id",username:"System",is_admin:!0,notifications:null}]};e.createChatRoom(s)}})},createChatRoom(e){if(e.id){let t=this.chatRoomList.findIndex(s=>s.id===e.id);t!==-1&&this.chatRoomList.splice(t,1,e)}else{e.id=this.uuid(),e.participants.forEach(i=>{delete i.profile});let t={id:this.userInfo.uid,username:this.userInfo.name,email:this.userInfo.email};e.participants.push(t);let s=Date.now();e.message={msg:"NEW",type:"text",createdAt:s},this.chatRoomList.push(e)}this.currentChatRoom=e,this.putObject("chat_rooms",e)},setReadMessage(e){let t=this.chatRoomList[e].participants.find(s=>s.email===this.userInfo.email);t&&(t.isExistUnReadMessage=!1),this.putObject("chat_rooms",this.chatRoomList[e])},chatRoomSelected(e){this.currentChatRoom=e,e.participants.find(t=>t.id==="system_id")?this.ProcessGPTActive=!0:this.ProcessGPTActive=!1,this.getChatList(e.id),this.setReadMessage(this.chatRoomList.findIndex(t=>t.id==e.id))},async putMessage(e){let t;e.uuid?t=e.uuid:t=this.uuid();let s={messages:e,id:this.currentChatRoom.id,uuid:t};this.putObject(`chats/${t}`,s);let i={msg:e.messageForUser?e.messageForUser:e.content,type:"text",createdAt:e.timeStamp};this.currentChatRoom.message=i,this.currentChatRoom.participants.forEach(r=>{r.email!==this.userInfo.email&&(r.isExistUnReadMessage=!0)}),this.putObject("chat_rooms",this.currentChatRoom)},beforeReply(e){e?this.replyUser=e:this.replyUser=null},async beforeSendMessage(e){if(e&&(e.text!=""||e.image!=null)){if(this.putMessage(this.createMessageObj(e)),!this.generator.contexts){let t=await this.storage.list("proc_def");this.generator.setContexts(t)}this.generator.setWorkList(this.generatedWorkList),e.callType="chats",this.sendMessage(e)}},async beforeExecuteProcess(e){var t=this;t.$try({context:t,action:async()=>{var s="/process-search/invoke",i={input:{answer:e.text||"",image:e.image||""}};let r=await f.post(s,i);const a=JSON.parse(r.data.output);if(a&&a.processDefinitionList){const n=a.processDefinitionList.pop();t.executeProcess(n.id)}}})},async executeProcess(e){var t=this;t.$try({context:t,action:async()=>{await t.backend.start({processDefinitionId:e}),t.EventBus.emit("instances-updated")}})},afterModelCreated(e){},deleteSystemMessage(e){this.storage.delete(`chats/${e.uuid}`,{key:"uuid"})},cancelProcess(e){let t=`${this.userInfo.name}님의 요청이 취소되었습니다.`;this.putMessage(this.createMessageObj(t,"system")),this.deleteSystemMessage(e)},deleteWorkList(e){this.generatedWorkList.splice(e,1)},deleteAllWorkList(){this.generatedWorkList=[]},async startProcess(e){var t=this;let s,i;if(e.content&&e.content.includes("{")?s=P(e.content):s=e,s.work=="StartProcessInstance"){if(!this.lastSendMessage){const r=this.messages.filter(a=>a.role==="user");this.lastSendMessage=r[r.length-1]}i=`"${s.title}" 프로세스를 시작하겠습니다.`,this.beforeExecuteProcess({text:s.title,image:this.lastSendMessage.image})}else if(s.work=="TodoListRegistration")i=`"${s.activity_id}" 할 일이 추가되었습니다.`,s.participants||(s.participants=[]),s.participants.includes(t.userInfo.email)||s.participants.push(t.userInfo.email),s.participants.forEach(function(r){let a=JSON.parse(JSON.stringify(s));delete a.work,delete a.messageForUser,delete a.participants,a.proc_inst_id=null,a.proc_def_id=null,a.id=t.uuid(),a.user_id=r,t.putObject("todolist",a)});else if(s.work=="ScheduleRegistration"){i=`"${s.title}" 일정이 추가되었습니다.`;let a=s.startDateTime.split("/")[0].split("-"),o=s.endDateTime.split("/")[0].split("-"),c=t.uuid(),p={id:c,title:s.title,description:s.description,allDay:!0,start:new Date(a[0],a[1]-1,a[2]),end:new Date(o[0],o[1]-1,o[2]),color:"#615dff"};s.participants||(s.participants=[]),s.participants.includes(t.userInfo.uid)||s.participants.push(t.userInfo.uid),s.participants.forEach(async function(h){let l;if(h==t.userInfo.uid)l=t.calendarData;else{let L={key:"uid"};const g=await t.storage.getObject(`db://calendar/${h}`,L);l=g&&g.data?g.data:{}}l[`${a[0]}_${a[1]}`]||(l[`${a[0]}_${a[1]}`]={}),l[`${a[0]}_${a[1]}`][c]=p;let C={uid:h,data:l};t.putObject(`calendar/${h}`,C)})}else s.work=="CreateProcessDefinition"&&(i="프로세스 정의가 생성되었습니다.",t.$store.dispatch("updateMessages",t.messages),t.$router.push("/definitions/chat"));i=`${t.userInfo.name}님이 요청하신 ${i}`,t.putMessage(t.createMessageObj(i,"system")),e.content&&t.deleteSystemMessage(e)},afterModelStopped(e){},async afterGenerationFinished(e){let t=e;if(t.work=="SKIP")this.ProcessGPTActive||this.messages.pop();else{this.ProcessGPTActive&&(t.expanded=!1,this.generatedWorkList.push(t));let i=this.createMessageObj(e,"system");if(t.messageForUser&&(i.messageForUser=t.messageForUser),t.work=="CompanyQuery")try{var s=window.$memento==""?"http://localhost:8005":window.$memento;let r=await f.post(`${s}/query`,{query:t.content});if(i.memento={},i.memento.response=r.data.response,!r.data.metadata)return{};const a={},n=Object.values(r.data.metadata).filter(c=>{if(!a[c.file_path])return a[c.file_path]=!0,!0});i.memento.sources=n;const o=await f.post(`${window.$backend}/process-data-query/invoke`,{input:{var_name:t.content}});i.tableData=o.data.output}catch(r){alert(r)}else t.work=="ScheduleQuery"?console.log(t):this.ProcessGPTActive||(i.uuid=this.uuid(),i.systemRequest=!0,i.requestUserEmail=this.userInfo.email);this.ProcessGPTActive||this.putMessage(i)}},async queryFromVectorDB(e){const s=await new T.VectorStorage({openAIApiKey:this.openaiToken}).similaritySearch({query:e});if(s.similarItems)return s.similarItems.map(i=>i.text)}}},W={class:"no-scrollbar"};function j(e,t,s,i,r,a){const n=m("ChatProfile"),o=m("ChatListing"),c=m("Chat"),p=m("AppBaseCard");return y(),v(D,{elevation:"10"},{default:u(()=>[d(p,null,{leftpart:u(()=>[M("div",W,[d(n),d(o,{chatRoomList:a.filteredChatRoomList,userList:e.userList,userInfo:e.userInfo,onChatSelected:a.chatRoomSelected,onCreateChatRoom:a.createChatRoom},null,8,["chatRoomList","userList","userInfo","onChatSelected","onCreateChatRoom"])])]),rightpart:u(()=>[(y(),w("div",{key:e.chatRenderKey},[d(c,{messages:e.messages,userInfo:e.userInfo,agentInfo:e.agentInfo,userList:e.userList,currentChatRoom:e.currentChatRoom,type:e.path,generatedWorkList:e.generatedWorkList,ProcessGPTActive:e.ProcessGPTActive,onRequestDraftAgent:e.requestDraftAgent,onRequestFile:e.requestFile,onBeforeReply:a.beforeReply,onSendMessage:a.beforeSendMessage,onStartProcess:a.startProcess,onCancelProcess:a.cancelProcess,onDeleteWorkList:a.deleteWorkList,onDeleteAllWorkList:a.deleteAllWorkList,onSendEditedMessage:e.sendEditedMessage,onStopMessage:e.stopMessage,onToggleProcessGPTActive:a.toggleProcessGPTActive},null,8,["messages","userInfo","agentInfo","userList","currentChatRoom","type","generatedWorkList","ProcessGPTActive","onRequestDraftAgent","onRequestFile","onBeforeReply","onSendMessage","onStartProcess","onCancelProcess","onDeleteWorkList","onDeleteAllWorkList","onSendEditedMessage","onStopMessage","onToggleProcessGPTActive"])]))]),mobileLeftContent:u(()=>[d(n),d(o,{chatRoomList:a.filteredChatRoomList,userList:e.userList,userInfo:e.userInfo,onChatSelected:a.chatRoomSelected,onCreateChatRoom:a.createChatRoom},null,8,["chatRoomList","userList","userInfo","onChatSelected","onCreateChatRoom"])]),_:1})]),_:1})}const z=S(U,[["render",j]]);export{z as default};
