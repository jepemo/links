Vue.component('link-item', {
  // The todo-item component now accepts a
  // "prop", which is like a custom attribute.
  // This prop is called todo.
  props: ['link'],
  template: '<li>{{ link.name }}</li>'
})

var app = new Vue({
    el: '#app',
    data: {
        links: [
            { id: 0, name: 'Vegetables' },
            { id: 1, name: 'Cheese' },
            { id: 2, name: 'Whatever else humans are supposed to eat' }
        ]
    },
    mounted: function(){
        this.fetchLinks();
    },
    methods: {
        fetchLinks: function() {
            alert("Hello world!");
        }
    }
})
