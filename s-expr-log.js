function sexp(data) 
{
    var children, elem, s
    s = ''
    if (Array.isArray(data)) 
    {
        var children = []
        for (key in data) 
        {
            children.push(sexp(data[key], indent+"  "))
        }
        if (children.length)
            return "\n" + indent + "  (" + children.join("\n  "+indent) + ")"
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
            var pair = "("+sexp(key, indent+"    ")+" . "+sexp(data[key], indent+"    ")+")"
            children.push(pair)
        }
        if (children.length)
            return "("+children.join("\n  "+indent)+")"
        else 
            return "()"
    }
}
