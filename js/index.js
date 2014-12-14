$(document).ready(function() {

    var userFeed = new Instafeed({
        get: 'user',
        userId: 309659803,
        accessToken: '309659803.467ede5.9538c477d87e4d4381fa27d2039d00a1',
        limit: 12,
        useHttp: true,
        resolution: 'low_resolution',
        template:   '<div class="col-md-3 col-sm-6"><a href="{{link}}"><img src="{{image}}" class="img-responsive" /></a></div>'
                    //// <div class="caption"><p>{{caption}}</p></div>
    });
    userFeed.run();
    console.log(userFeed);
});
