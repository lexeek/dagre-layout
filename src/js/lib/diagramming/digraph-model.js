/**
 * Created with JetBrains WebStorm.
 * User: tikhonov
 * Date: 9/18/13
 * Time: 8:22 PM
 * To change this template use File | Settings | File Templates.
 */



function Digraph () {
    this.$digraph = $('textarea#dot-src');
    this._digraph = {};
    this._diname = "";
}

Digraph.prototype = {

    addNodejsp: function(node) {

    }
    ,removeNodejsp: function(node) {

    }
    ,addEdgejsp: function(nodeFrom, nodeTo) {

    }
    ,removeEdgejsp: function (nodeFrom, nodeTo) {

    }
    ,setConnections: function(jspInstance) {

        jspInstance.select().each(function (connection) {
            console.log("connection: ", connection.sourceId);
        })
    }
}
