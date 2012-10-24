function sexp(data) 
{
    var children, elem, s
    s = ''
    if (Array.isArray(data)) 
    {
        var children = []
        for (key in data) 
        {
            children.push(sexp(data[key]))
        }
        return "(" + children.join(" ") + ")"
    } 
    else if ((typeof data === "string" || data instanceof String) && data.search(" ") == -1 && data.search("\"") == -1)
    {
        return data
    }
    else
    {
        var children = []
        for (key in data)
        {
            var pair = "("+sexp(key)+" . "+sexp(data[key])+")"
            children.push(pair)
        }
        return "("+children.join(" ")+")"
    }
}
