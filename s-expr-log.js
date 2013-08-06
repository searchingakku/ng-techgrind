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
    else if ((typeof data === "string" || data instanceof String) 
             && data.search(" ") == -1 
             && data.search("\"") == -1 
             && data != "" 
             && !Number(data) /* strings that look like numbers need to be quoted */
             && data != "0"
             && data[0] != "(" /* strings that look like lists need to be quoted */
             && data[data.length-1] != ")")
    {

        return data
    }
    else if (typeof data === "object" && !(data instanceof String) && Object.keys(data).length)
    {
        var children = []
        for (key in data)
        {
            var keystr = sexpr(key, indent+1)
            var valstr = sexpr(data[key], indent+keystr.length+2)
            var sep = " . "
            if (valstr[0] == "(" && valstr[valstr.length-1] == ")") // turn (key . (val)) into (key val)
            {
                valstr = valstr.substr(1, valstr.length-2)
                if (valstr.length)
                    sep = " "
                else
                    sep = ""
            }
            var pair = "("+keystr+sep+valstr+")"
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
