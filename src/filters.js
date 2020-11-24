import vue from 'vue';


vue.filter('shortenText',function(value,length){
    if(!value) return;
    return value.substring(0,length) + '...';
});

vue.filter('convertDate',function(value){
    if(!value) return;
    return new Date(value).toDateString();
});

