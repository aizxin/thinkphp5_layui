/**

 @Name：layui.sow 工具集
 @Author：Sow
 @License：MIT

*/

layui.define('jquery', function(exports) {
    "use strict";
    var $ = layui.jquery;
    var sow = sow || {};
    sow.parse_url = function(url) {
        var parse = url.match(/^(?:([a-z]+):\/\/)?([\w-]+(?:\.[\w-]+)+)?(?::(\d+))?([\w-\/]+)?(?:\?((?:\w+=[^#&=\/]*)?(?:&\w+=[^#&=\/]*)*))?(?:#([\w-]+))?$/i);
        parse || $.error("url格式不正确！");
        return {
            "scheme": parse[1],
            "host": parse[2],
            "port": parse[3],
            "path": parse[4],
            "query": parse[5],
            "fragment": parse[6]
        };
    }
    sow.parse_str = function(str) {
        var value = str.split("&"),
            vars = {},
            param;
        for (var i = 0; i < value.length; i++) {
            param = value[i].split("=");
            vars[param[0]] = param[1];
        }
        return vars;
    }
    sow.U = function(url, vars) {
        if (!url || url == '') return '';
        var info = this.parse_url(url),
            path = [],
            reg;
        /* 验证info */
        info.path || $.error("url格式错误！");
        url = info.path;
        /* 解析URL */
        path = url.split("/");
        // path = [path.pop(), path.pop(), path.pop()].reverse();
        // path[1] || $.error("sow.U(" + url + ")没有指定控制器");

        /* 解析参数 */
        if (typeof vars === "string") {
            vars = sow.parse_str(vars);
        }
        /* 解析URL自带的参数 */
        info.query && $.extend(vars, this.parse_str(info.query));
        // if (false !== sow.conf.SUFFIX) {
        //  url += "." + sow.conf.SUFFIX;
        // }
        if ($.isPlainObject(vars)) {
            url += "?" + $.param(vars);
        }
        //url = url.replace(new RegExp("%2F","gm"),"+");
        url = window.conf.APP + "/" + url;
        return url;
    };

    exports('sow', sow);
});
