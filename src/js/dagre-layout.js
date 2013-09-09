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

var jspInstance = null;

$(document).ready(function () {

    var _initialised = false;
    var content = $("#jsPlumb-content");

    $(window).resize(function () {
        if (jspInstance !== null) {
            jspInstance.repaintEverything();
            console.log("resize");
        }
    });
    jsPlumbInit();

    function jsPlumbInit() {

        jspInstance = jsPlumb.importDefaults({
            Endpoint: ["Dot", {radius: 2}],
            HoverPaintStyle: {strokeStyle: "#1e8151", lineWidth: 2 },
            ConnectionOverlays: [
                [ "Arrow", {
                    location: 1,
                    id: "arrow",
                    length: 14,
                    foldback: 0.8
                } ],
                [ "Label", { label: "FOO", id: "label", cssClass: "aLabel" }]
            ]
        });


        jspInstance.Defaults.Container = "jsPlumb-content";


        jspInstance.makeSource($(".node"), {
            filter: ".ep",				// only supported by jquery
            anchor: "Continuous",
//            anchor: [[0.2, 0, 0, -1, 0, 0, "foo"], [1, 0.2, 1, 0, 0, 0, "bar"], [0.8, 1, 0, 1, 0, 0, "baz"], [0, 0.8, -1, 0, 0, 0, "qux"] ],
//            Connector:[ "Straight", { lineWidth:5, strokeStyle:'black' } ],
            connector: [ "StateMachine", { curviness: 20 } ],
            connectorStyle: { strokeStyle: "#5c96bc", lineWidth: 2, outlineColor: "transparent", outlineWidth: 4 },
            maxConnections: 5,
            onMaxConnections: function (info, e) {
                console.log("Maximum connections (" + info.maxConnections + ") reached");
            }
        });


        jspInstance.bind("connection", function (info) {
            info.connection.getOverlay("label").setLabel(info.connection.id);
        });

        jspInstance.makeTarget($(".node"), {
            dropOptions: { hoverClass: "dragHover" },
            anchor: "Continuous"
//            anchor: [[0.6, 0, 0, -1], [1, 0.6, 1, 0], [0.4, 1, 0, 1], [0, 0.4, -1, 0] ]
        });

        jspInstance.bind("click", function (c) {
            jspInstance.detach(c);
        });

        jspInstance.draggable($(".node"), {
            containment: "jsPlumb-content"
        });

        return jspInstance;
    };
//    );

    var nodeCount = 1;
    var nodeCountNested = 1;
    var left = 0;

    function addNode(isNested, elem) {
        console.log("addNode");
        var nodeElem = $("<div id='jsplumb-node-' style='width: 90px; height: 40px;' class='node'>Node " + nodeCount + " <div class='ep'>ep</div></div>");
        nodeElem.attr("id", nodeElem.attr('id') + nodeCount);
//        left = left + 25;
//        nodeElem.css('left', left);


        if (isNested) {

//            _initialised = false;
            var nestedElem = $("<div style='width: 50px; height: 40px;' class='node-nested' id='nested-'" + nodeCountNested + "> Nested " + nodeCountNested + "</div>");

            console.log("elem", elem);
            if (typeof elem !== "undefined" && $(elem).length > 0) {
                console.log("e", elem);
                $(elem).parent().append(nestedElem);
                console.log("add nested");
                nodeCountNested++;
            } else {
                nodeElem.css('width', 250).css('height', 150);
                var addChildBtn = $("<button style='float: right'  id='addChild'>Add Child node</button>");
                nodeElem.append(addChildBtn);
                console.log("ADD NEST");
                addChildBtn.click(function (e, el) {
                    addNode(true, this);
                    jspInstance.repaintEverything();
                });

            }
        }

        if (typeof elem == "undefined") {

            content.append(nodeElem);
            nodeCount++;

        }


        var instance = jsPlumbInit();
        if (isNested) {
            instance.draggable(nestedElem, {
                containment: $(elem).parent()
            });
        }
//        console.log("isNested", isNested);
    };

    init();
    function init() {

        if (!_initialised) {
            $("#clear").click(function () {
                jspInstance.detachEveryConnection();
            });

            $("#reload").click(function () {
                var config = {};
                config.rankDir = $('#rankDir').val();
                config.nodeSep = parseInt($('#nodeSep').val());
                config.edgeSep = parseInt($('#edgeSep').val());
                config.rankSep = parseInt($('#rankSep').val());
                config.widthNode = parseInt($('#widthNode').val());
                config.heightNode = parseInt($('#heightNode').val());

                if ($('.node').length > 0)
                    initDagrePlumb(jspInstance, config);
//            jspInstance.repaintEverything();
            })

            $('#addNode').click(function () {
                addNode(false);
                jspInstance.repaintEverything();
            })

            $('#addNested').click(function () {
                addNode(true);
                jspInstance.repaintEverything();
            });

            _initialised = true;
        }
    }
});


function initDagrePlumb(jspInstance, config) {
    var nodes = new Array();

    $.each($(".node"),function (name, obj) {


        var widthNode = parseInt($(obj).css('width').replace('px', ''));
        var heightNode = parseInt($(obj).css('height').replace('px', ''));
        var topNode = parseInt($(obj).css('top').replace('px', ''));


        obj.width = widthNode;
        obj.height = heightNode;
//        obj.width = 350;
//        obj.height = 180;
//        obj.top = 'NaN';
//        obj.width = config.widthNode;
//        obj.height = config.heightNode;
//        console.log(config);
        nodes[name] = obj;
        console.log("nodes[name]: ", nodes[name]);
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

//    console.log("config", config);
    dagre.
        layout().
        nodes(nodes).
        edges(edges).
        rankDir(config.rankDir).
        nodeSep(config.nodeSep).
        edgeSep(config.edgeSep).
        rankSep(config.rankSep).
        run();


    $.each(nodes, function (name, obj) {

        console.log("Node " + obj.dagre.id + ": " + JSON.stringify(obj.dagre));
//        if (config.rankDir == "LR") {
//            $("#" + obj.id).css({"right": obj.dagre.x});
//        } else {
//
//        }
//        $("#" + obj.id).css({"left": obj.dagre.x});
        $("#" + obj.id).css({"left": obj.dagre.x });
//        $("#" + obj.id).css({"right": obj.dagre.x - obj.dagre.ur});
        $("#" + obj.id).css({"bottom": obj.dagre.y});
//        $("#" + obj.id).css({"top": 'inherit'});

        jspInstance.repaintEverything();
    });

    jspInstance.repaintEverything();
}