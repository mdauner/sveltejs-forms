import{S as t,i as s,s as o,q as a,e,l as n,u as i,a as r,b as p,m as l,d as c,f as u,g as h,o as f,p as m,n as d}from"./index.f58968d2.js";function v(t){var s,o,v,g,x,b,j=t.post.title+"",q=t.post.html+"";return document.title=s=t.post.title,{c(){o=a(),v=e("h1"),g=n(j),x=a(),b=e("div"),this.h()},l(t){o=i(t),v=r(t,"H1",{},!1);var s=p(v);g=l(s,j),s.forEach(c),x=i(t),b=r(t,"DIV",{class:!0},!1),p(b).forEach(c),this.h()},h(){u(b,"class","content svelte-1qu5tbv")},m(t,s){h(t,o,s),h(t,v,s),f(v,g),h(t,x,s),h(t,b,s),b.innerHTML=q},p(t,o){t.post&&s!==(s=o.post.title)&&(document.title=s),t.post&&j!==(j=o.post.title+"")&&m(g,j),t.post&&q!==(q=o.post.html+"")&&(b.innerHTML=q)},i:d,o:d,d(t){t&&(c(o),c(v),c(x),c(b))}}}async function g({params:t,query:s}){const o=await this.fetch(`blog/${t.slug}.json`),a=await o.json();if(200===o.status)return{post:a};this.error(o.status,a.message)}function x(t,s,o){let{post:a}=s;return t.$set=(t=>{"post"in t&&o("post",a=t.post)}),{post:a}}export default class extends t{constructor(t){super(),s(this,t,x,v,o,["post"])}}export{g as preload};