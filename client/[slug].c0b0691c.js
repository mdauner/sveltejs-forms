import{S as t,i as s,s as a,a as o,e,t as n,g as i,c as r,b as p,d as c,f as l,h,k as u,l as f,w as m,n as d}from"./index.a15af76c.js";function g(t){var s,a,g,x,v,j,w=t.post.title+"",H=t.post.html+"";return document.title=s=t.post.title,{c(){a=o(),g=e("h1"),x=n(w),v=o(),j=e("div"),this.h()},l(t){a=i(t),g=r(t,"H1",{},!1);var s=p(g);x=c(s,w),s.forEach(l),v=i(t),j=r(t,"DIV",{class:!0},!1),p(j).forEach(l),this.h()},h(){h(j,"class","content svelte-gnxal1")},m(t,s){u(t,a,s),u(t,g,s),f(g,x),u(t,v,s),u(t,j,s),j.innerHTML=H},p(t,a){t.post&&s!==(s=a.post.title)&&(document.title=s),t.post&&w!==(w=a.post.title+"")&&m(x,w),t.post&&H!==(H=a.post.html+"")&&(j.innerHTML=H)},i:d,o:d,d(t){t&&(l(a),l(g),l(v),l(j))}}}async function x({params:t,query:s}){const a=await this.fetch(`blog/${t.slug}.json`),o=await a.json();if(200===a.status)return{post:o};this.error(a.status,o.message)}function v(t,s,a){let{post:o}=s;return t.$set=(t=>{"post"in t&&a("post",o=t.post)}),{post:o}}export default class extends t{constructor(t){super(),s(this,t,v,g,a,["post"])}}export{x as preload};