/**
 * Created with JetBrains WebStorm.
 * User: tikhonov
 * Date: 9/18/13
 * Time: 8:22 PM
 * To change this template use File | Settings | File Templates.
 */



function Digraph() {
    this.$digraph = $('textarea#dot-src');
    this._digraph = "digraph ";
    this._diname = "";
    this._edges = new Array();
}

Digraph.prototype = {

    addNodejsp: function (node) {

    },
    removeNodejsp: function (node) {

    },
    addEdgejsp: function (nodeFrom, nodeTo) {

    },
    removeEdgejsp: function (nodeFrom, nodeTo) {

    },
    appendDom: function(dg){
        this.$digraph.text(dg);
    },
    makeDigraph: function (config) {

        console.log("this._edges");
        console.log(this._edges);
        var strEdges = "";

        for (var i = 0; i < this._edges.length; i++) {
            var tmp ="";
            tmp += this._edges[i].join("->");
            strEdges += tmp + ";" +'\n';
        }
        console.log("strEdges");
        console.log(strEdges);


        this._digraph +=  + config.name + "{" + config.node + '\n' + strEdges + "}";

        this.appendDom(this._digraph);
    },
    setConnections: function (jspInstance) {

        var edges = new Array();
        var i = 0;

        jspInstance.select().each(function (connection) {
            var edge = new Array();
            edge[0] =   "\"" + $(connection.source).attr('id') + "\"" ;
            edge[1] =   "\"" + $(connection.target).attr('id') + "\"";
//            edge.label = "";
            edges[i++] = edge;
        });

        this._edges = edges;


    }
}


/* helper links
    -   http://stackoverflow.com/questions/15211096/jsplumb-dynamic-endpoint-anchors-on-each-side

 */
