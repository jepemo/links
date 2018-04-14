function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

String.prototype.format = String.prototype.f = function() {
    var s = this,
        i = arguments.length;

    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};

function get_str_tags(tags)
{
    var res = "";
    for(var index in tags) {
        res += "<div class=\"badge badge-secondary\">{0}</div>&nbsp;".format(tags[index]);
    }
    return res;
}

function create_link(name, url, tags, desc)
{
    return `
    <div>
        <a href="{0}" target="_blank">
            {1}
        </a>
    </div>
    <div style=\"font-size:75%;\">
        {2}
    </div>
    <div>{3}</div>
    <hr/>
`.format(url, name, desc, get_str_tags(tags));
}

function convert_entries(data)
{
    var ll = [];
    var id = 0;
    for (var key in data) {
        const entry = data[key];
        ll.push({
            id: id,
            url: key,
            name: capitalize(entry['name']),
            desc: capitalize(entry['desc']),
            tags: entry['tags'],
        });
        id++;
    }

    return ll;
}

function to_components(list)
{
    result = "";
    for(var index in list)
    {
        entry = list[index];
        result += create_link(entry["name"], entry["url"], entry["tags"], entry["desc"]);
    }

    return result;
}

function load_db()
{
    $.get( "https://jepemo.github.io/links/db.json", function( data ) {

      entries = convert_entries(data);
      components = to_components(entries);
      $("#links").html(components);

    });
}

function start()
{
    load_db();
}
