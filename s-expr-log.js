function sexp(data, indent) 
{
    if (!indent)
        indent = 0

    var children, elem, s
    s = ''
    if (Array.isArray(data)) 
    {
        var children = []
        for (key in data) 
        {
            children.push(sexp(data[key], indent+1))
        }
        if (children.length)
            return "(" + children.join("\n"+pad(indent+1)) + ")"
        else 
            return "()"
    } 
    else if ((typeof data === "string" || data instanceof String) && data.search(" ") == -1 && data.search("\"") == -1)
    {
        return data
    }
    else if ((typeof data === "string" || data instanceof String))
    {
        return JSON.stringify(data)
    }
    else
    {
        var children = []
        for (key in data)
        {
            var keystr = sexp(key, indent+1)
            var pair = "("+keystr+" . "+sexp(data[key], indent+keystr.length+5)+")"
            children.push(pair)
        }
        if (children.length)
            return "("+children.join("\n"+pad(indent+1))+")"
        else 
            return "()"
    }
}

function pad(length, padchar)
{
    if (!padchar)
        padchar = " "
    return new Array(length+1).join(padchar)
}
