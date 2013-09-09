///**
// * Created with JetBrains WebStorm.
// * User: tikhonov
// * Date: 9/6/13
// * Time: 6:03 PM
// * To change this template use File | Settings | File Templates.
// */
//
//
//
//
//
//
//jsPlumb.bind("ready", function() {
//
//    var endpointSource = { isSource:false, isTarget:true};
//    var endpointTarget = { isSource:true, isTarget:false};
//
//    var firstInstance = jsPlumb.getInstance({
//        PaintStyle:{
//            lineWidth:6,
//            strokeStyle:"yellow",
//            outlineColor:"red",
//            outlineWidth:1
//        },
//        Connector:[ "Bezier", { curviness: 30 } ],
////        Connector:[ "Straight", { lineWidth:5, strokeStyle:'black' } ],
//        Endpoint:[ "Dot", { radius:10 } ],
//        EndpointStyle : { fillStyle: "#567567"  },
//        Anchor : [ 0.5, 0.5, 1, 1 ]
////        Anchors : [ "TopCenter", "BottomCenter" ]
//    });
//
//
////    firstInstance.addEndpoint('node0', { anchor:"TopCenter" }, endpointSource );
////    firstInstance.addEndpoint('node0', { anchor:"BottomCenter" }, endpointTarget );
//
//
//    firstInstance.addEndpoint('node1', { anchor:"TopCenter" }, endpointSource );
//    firstInstance.addEndpoint('node1', { anchor:"BottomCenter" }, endpointTarget );
//
//    firstInstance.addEndpoint('node2', { anchor:"TopCenter" }, endpointSource );
//    firstInstance.addEndpoint('node2', { anchor:"BottomCenter" }, endpointTarget );
//
//    firstInstance.addEndpoint('node3', { anchor:"TopCenter" }, endpointSource );
//    firstInstance.addEndpoint('node3', { anchor:"BottomCenter" }, endpointTarget );
//
////    firstInstance.addEndpoint('node4', { anchor:"TopCenter" }, endpointSource );
////    firstInstance.addEndpoint('node4', { anchor:"BottomCenter" }, endpointTarget );
//
////    firstInstance.addEndpoint('nested-nodes', { anchor:"TopCenter" }, endpointSource );
////    firstInstance.addEndpoint('nested-nodes', { anchor:"BottomCenter" }, endpointTarget );
//
//    firstInstance.Defaults.Container = "svg-canvas";
////    firstInstance.Defaults.Container = "jsPlumb-container";
//
//
////    firstInstance.draggable($(".node"), {containment:"parent"});
//    firstInstance.draggable($(".node"));
//    firstInstance.draggable("nested-nodes");
//
//
//});
//
//
//
//function renderJsPlumbNodes(nodes) {
//
//};
//
//
//
//
//


//DOCS
//http://www.graphviz.org/pdf/dot.1.pdf
//https://github.com/cpettitt/dagre/issues/42


$(document).ready(function () {

    var _initialised = false;

    var content = $("#jsPlumb-content");
    for (var i = 0; i < 10; i++) {

        var nodeElem = $("<div id='jsplumb-node-' style='width: 90px; height: 40px;' class='node'>Node " + i + " <div class='ep'>ep</div></div>");

        (function () {
            nodeElem.attr("id", nodeElem.attr('id') + i);
//            console.log("nodeElem", nodeElem.attr("id"));

        })(i, nodeElem)
        content.append(nodeElem);
    }


    jsPlumb.bind('ready', function () {


//        var jspInstance = jsPlumb.getInstance({
//            DragOptions : { cursor: 'pointer', zIndex:2000 },
//            HoverPaintStyle : {strokeStyle:"#1e8151", lineWidth:5 },
//            PaintStyle: {
//                lineWidth: 5,
//                strokeStyle: "#143C28",
////                outlineColor: "red",
//                outlineWidth: 1
//            },
//            ConnectionOverlays : [
//                [ "Arrow", {
//                    location:1,
//                    id:"arrow",
//                    length:14,
//                    foldback:0.8
//                } ],
//                [ "Label", { label:"example", id:"label", cssClass:"aLabel" }]
//            ],
////            Connector: [ "Bezier", { curviness: 30 } ],
////        Connector:[ "Straight", { lineWidth:5, strokeStyle:'black' } ],
////            Endpoint: [ "Dot", { radius: 10 } ],
////            Endpoint : "Rectangle",
//            Endpoint : ["Dot", {radius:5}]
////            ,
////            EndpointStyle : { width:20, height:16, strokeStyle:'#666' },
////            EndpointStyle: { fillStyle: "#567567"  },
////            Anchor: [ 0.5, 0.5, 1, 1 ],
////        Anchors : [ "TopCenter", "BottomCenter" ]
////            Anchors : ["TopCenter", "TopCenter"]
//        });



        var jspInstance = jsPlumb.importDefaults({
            Endpoint : ["Dot", {radius:2}],
            HoverPaintStyle : {strokeStyle:"#1e8151", lineWidth:2 },
            ConnectionOverlays : [
                [ "Arrow", {
                    location:1,
                    id:"arrow",
                    length:14,
                    foldback:0.8
                } ],
                [ "Label", { label:"FOO", id:"label", cssClass:"aLabel" }]
            ]
        });


//        jspInstance.Defaults.Container = "jsPlumb-content";





        jspInstance.makeSource($(".node"), {
            filter:".ep",				// only supported by jquery
            anchor:"Continuous",
//            Connector:[ "Straight", { lineWidth:5, strokeStyle:'black' } ],
            connector:[ "StateMachine", { curviness:20 } ],
            connectorStyle:{ strokeStyle:"#5c96bc", lineWidth:2, outlineColor:"transparent", outlineWidth:4 },
            maxConnections:5,
            onMaxConnections:function(info, e) {
                alert("Maximum connections (" + info.maxConnections + ") reached");
            }
        });

        jspInstance.draggable($(".node"));

        jspInstance.bind("connection", function(info) {
            info.connection.getOverlay("label").setLabel(info.connection.id);
        });

        jspInstance.makeTarget($(".node"), {
            dropOptions:{ hoverClass:"dragHover" },
            anchor:"Continuous"
        });

        jspInstance.bind("click", function(c) {
            jspInstance.detach(c);
        });

        // bind to connection/connectionDetached events, and update the list of connections on screen.
//        jspInstance.bind("connection", function(info, originalEvent) {
//            updateConnections(info.connection);
//        });
//        jspInstance.bind("connectionDetached", function(info, originalEvent) {
//            updateConnections(info.connection, true);
//        });

        // configure some drop options for use by all endpoints.
        var exampleDropOptions = {
            tolerance:"touch",
            hoverClass:"dropHover",
            activeClass:"dragActive"
        };

        var exampleColor = "#00f";
//        var exampleColor = "rgba(229,219,61,0.5)";

        var endpointSource = {
            endpoint:"Rectangle",
//            paintStyle:{ width:25, height:21, fillStyle:exampleColor },
            reattach:true,
//            connectorStyle : {
//                gradient:{stops:[[0, exampleColor], [0.5, "#09098e"], [1, exampleColor]]},
//                lineWidth:5,
//                strokeStyle:exampleColor,
//                dashstyle:"2 2"
//            },
//            beforeDrop:function(params) {
//                return confirm("Connect " + params.sourceId + " to " + params.targetId + "?");
//            },
            isSource: false,
            isTarget: true,
            dropOptions : exampleDropOptions
        };
        var endpointTarget = { isSource: true, isTarget: false};



        // setup some DynamicAnchors for use with the blue endpoints
        // and a function to set as the maxConnections callback.
        var anchors = [[1, 0.2, 1, 0], [0.8, 1, 0, 1], [0, 0.8, -1, 0], [0.2, 0, 0, -1] ],
            maxConnectionsCallback = function(info) {
                alert("Cannot drop connection " + info.connection.id + " : maxConnections has been reached on Endpoint " + info.endpoint.id);
            };



//        var e1 = jsPlumb.addEndpoint("#jsplump", { anchor:anchors }, exampleEndpoint);
//
//        e1.bind("maxConnections", maxConnectionsCallback);



//        jspInstance.addEndpoint($(".node"), { anchor:"TopCenter" }, endpointSource);
//        jspInstance.addEndpoint($(".node"), { anchor:"BottomCenter" }, endpointTarget);



        if(!_initialised) {
            $("#clear").click(function() {
                jspInstance.detachEveryConnection();
//                showConnectionInfo("");
            });

            $("#reload").click(function() {
                initDagrePlumb(jspInstance);
                $(document).ready(function () {
                    jspInstance.repaintEverything();
                })
            })


            _initialised = true;
        }

    });

});





function initDagrePlumb(jspInstance) {
    var nodes = new Array();

    var nodesDom = $.each($(".node"), function () {
    });

    nodesDom.each(function (name, obj) {

//        console.log("name", name);
//        console.log("obj", obj);
        var $el = $(this);
            cur = nodesDom.not($el);

//        console.log("$el", $el);
//        console.log("cur",  cur);

//        if(jspInstance.select($el).length == 0 ) {
//            console.log("return");
//            return;
//        }
        var widthNode = parseInt($(obj).css('width').replace('px', ''));
        obj.width = 180;
//        obj.width = widthNode;
        obj.height = 140;

//        obj.width = 90;
//        obj.height = 180;
        nodes[name] = obj;
    });

    var edges = new Array();
    var i = 0;

    jspInstance.select().each(function (connection) {
        var edge = new Object();
        edge.source = connection.target;
        edge.target = connection.source;
        edge.label = "";
        edges[i++] = edge;
    });

    dagre.
        layout().
        nodes(nodes).
        edges(edges).
        rankDir("TB").
        run();


    $.each(nodes, function (name, obj) {
        $("#" + obj.id).css({"left": obj.dagre.x + 150});
        $("#" + obj.id).css({"bottom": obj.dagre.y});

        jspInstance.repaintEverything();
    });

    jspInstance.repaintEverything();
}