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
`.format(url, name, desc, ""); //get_str_tags(tags));
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

function to_components(all_tags, entries)
{
    result = "";

    for (var iTag in all_tags) {
        let sectionTag = tags[iTag];

        result += "<a id=\"" + sectionTag + "\"><h2>" + sectionTag + "</h2></a>";

        for(var index in entries)
        {
            let entry = entries[index];
            let name = entry["name"];
            let url = entry["url"];
            let tags = entry["tags"];
            let desc = entry["desc"];

            if ($.inArray(sectionTag, tags) >= 0) {
                result += create_link(name, url, tags, desc);
            }
        }
    }

    return result;
}

function get_tags(entries)
{
    all_tags = [];
    for (var index in entries) {
        let entry = entries[index];
        let tags = entry["tags"];
        for (var iTag in tags) {
            let tag = tags[iTag];
            if($.inArray(tag, all_tags) == -1) {
                all_tags.push(tag);
            }
        }
    }

    all_tags.sort();

    return all_tags;
}

function to_tag_links(tags)
{
    let content = "<div>";
    let cols = 5;

    let num=1;
    for (var iTag in tags) {
        let tag = tags[iTag];
        content += `
    <a href="#{0}">[{1}]</a>&nbsp;
`.format(tag, tag);

        if(num++ > cols) {
            content +=" <br/>";
            num = 1;
        }
    }

    return content + "</div><br/>";
}

function load_db()
{
    $.get( "https://jepemo.github.io/links/db.json", function( data ) {

      entries = convert_entries(data);
      tags = get_tags(entries);

      components = "";
      components += to_tag_links(tags);
      components += to_components(tags, entries);

      $("#links").html(components);
    });
}

function start()
{
    load_db();
}
