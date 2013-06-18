function sexp()
{
    if (arguments.length > 1)
        return sexpr(Array.prototype.slice.call(arguments))
    else
        return sexpr(arguments[0])
}

function sexpr(data, indent)
{
    if (!indent)
        indent = 0

    var children, elem, s
    s = ''
    if (data == null)
    {
        return "nil"
    }
    else if (Array.isArray(data))
    {
        var children = []
        for (key in data)
        {
            children.push(sexpr(data[key], indent+1))
        }
        if (children.length)
            return "(" + children.join("\n"+pad(indent+1)) + ")"
        else
            return "()"
    }
    else if ((typeof data === "string" || data instanceof String) && data.search(" ") == -1 && data.search("\"") == -1 && data != "" && !Number(data) && data != "0")
    {
        /* strings that look like numbers need to be quoted */
        return data
    }
    else if (typeof data === "object" && !(data instanceof String) && Object.keys(data).length)
    {
        var children = []
        for (key in data)
        {
            var keystr = sexpr(key, indent+1)
            var pair = "("+keystr+" . "+sexpr(data[key], indent+keystr.length+5)+")"
            children.push(pair)
        }
        if (children.length)
            return "("+children.join("\n"+pad(indent+1))+")"
        else
            return "()"
    }
    else if ((typeof data === "string" || data instanceof String || typeof data === "number" || data instanceof Number))
    {
        return JSON.stringify(data)
    }
    else if (typeof data === "object")
    {
        return "("+typeof data+" ("+(typeof data === "object")+" && "+!(data instanceof String)+" && "+Object.keys(data).length+") "+JSON.stringify(data)+")"
    }
    else
    {
        return "("+typeof data+" "+JSON.stringify(data)+")"
    }
}

function pad(length, padchar)
{
    if (!padchar)
        padchar = " "
    return new Array(length+1).join(padchar)
}
