import Vue from 'vue'
const textOverflow = Vue.directive('text-overflow', {
  inserted: function (el,binding) {
    //第几行出现省略号
    let clamp = 1
    if (binding.value) {
      clamp = binding.value
    }
    if (el.offsetHeight<el.scrollHeight) {
      el.style.overflow = 'hidden'
      el.style.position = 'relative'
      el.style['text-overflow'] = 'ellipsis'
      el.style.display = '-webkit-box'
      el.style['-webkit-line-clamp'] = clamp
      el.style['-webkit-box-orient'] = 'vertical'
      let text = el.innerHTML
      let div = document.createElement('div')
      div.style.position = 'fixed'
      div.style['z-index'] = 99
      div.style.background = 'rgba(0,0,0,.7)'
      div.style.color = '#fff'
      div.style.fontSize = '12px'
      div.style.padding = '5px'
      div.style.borderRadius = '2px'
      div.innerHTML = text
      //无需指定第几行缩略方案
      // let span = document.createElement('span')
      // span.style.position = 'absolute'
      // span.style.right = 0
      // span.style.bottom = 0
      // span.style.background = '#fff'
      // span.innerHTML = '...'
      // el.appendChild(span)
      el.onmouseenter = (e)=>{
        document.documentElement.appendChild(div)
      }
      el.onmouseout = (e)=>{
        div.remove()
      }
      el.onmousemove = (e)=>{
        div.style.left = e.clientX + 10 + 'px';
        div.style.top = e.clientY + 10 + 'px';
      }
    }
  }
})
