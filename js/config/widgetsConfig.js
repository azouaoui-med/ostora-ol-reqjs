define(["require"], function (require) {

    return {
        menuList:[
            {
                title:'Draw',
                type:'simple',
                widget:{
                    title:'Draw',
                    icon:'<i class="fa fa-pencil-alt" aria-hidden="true"></i>',
                    path:'app/widgets/draw/draw'

                }
            },
            {
                title:'Example',
                type:'simple',
                widget:{
                    title:'Example',
                    icon:'<i class="far fa-gem" aria-hidden="true"></i>',
                    path:'app/widgets/example/example'

                }
            }
        ]
    }

});