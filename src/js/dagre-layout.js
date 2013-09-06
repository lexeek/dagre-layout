/**
 * Created with JetBrains WebStorm.
 * User: tikhonov
 * Date: 9/6/13
 * Time: 6:03 PM
 * To change this template use File | Settings | File Templates.
 */






jsPlumb.bind("ready", function() {

    var endpointSource = { isSource:false, isTarget:true};
    var endpointTarget = { isSource:true, isTarget:false};

    var firstInstance = jsPlumb.getInstance({
        PaintStyle:{
            lineWidth:6,
            strokeStyle:"yellow",
            outlineColor:"red",
            outlineWidth:1
        },
        Connector:[ "Bezier", { curviness: 30 } ],
//        Connector:[ "Straight", { lineWidth:5, strokeStyle:'black' } ],
        Endpoint:[ "Dot", { radius:10 } ],
        EndpointStyle : { fillStyle: "#567567"  },
        Anchor : [ 0.5, 0.5, 1, 1 ]
//        Anchors : [ "TopCenter", "BottomCenter" ]
    });


    firstInstance.addEndpoint('node0', { anchor:"TopCenter" }, endpointSource );
    firstInstance.addEndpoint('node0', { anchor:"BottomCenter" }, endpointTarget );


    firstInstance.addEndpoint('node1', { anchor:"TopCenter" }, endpointSource );
    firstInstance.addEndpoint('node1', { anchor:"BottomCenter" }, endpointTarget );

    firstInstance.addEndpoint('node2', { anchor:"TopCenter" }, endpointSource );
    firstInstance.addEndpoint('node2', { anchor:"BottomCenter" }, endpointTarget );

    firstInstance.addEndpoint('node3', { anchor:"TopCenter" }, endpointSource );
    firstInstance.addEndpoint('node3', { anchor:"BottomCenter" }, endpointTarget );

//    firstInstance.addEndpoint('node4', { anchor:"TopCenter" }, endpointSource );
//    firstInstance.addEndpoint('node4', { anchor:"BottomCenter" }, endpointTarget );

    firstInstance.addEndpoint('nested-nodes', { anchor:"TopCenter" }, endpointSource );
    firstInstance.addEndpoint('nested-nodes', { anchor:"BottomCenter" }, endpointTarget );

    firstInstance.Defaults.Container = "jsPlumb-container";


//    firstInstance.draggable($(".node"), {containment:"parent"});
    firstInstance.draggable($(".node"));
    firstInstance.draggable("nested-nodes");


});




