function sexp(data) 
{
    var children, elem, s
    s = ''
    if (Array.isArray(data)) 
    {
        children = ((function() 
                    {
                        var _i, _len, _results;
                        _results = []
                        for (_i = 0, _len = data.length; _i < _len; _i++) 
                        {
                            elem = data[_i];
                            _results.push(sexp(elem))
                        }
                        return _results
                    })()).join(' ')
        return '(' + children + ')'
    } 
    else 
    {
        return JSON.stringify(data)
    }
}
