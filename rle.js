var input = document.getElementById('input'),
    datalength = document.getElementById('datalength'),
    result = document.getElementById('result');

function str2hex(str) {
    return str.split('').map(function (char) {
        var value = char.charCodeAt(0);

        return ((value < 16 ? '0' : '') + value.toString(16)).toUpperCase();
    }).join(' ');
}

function hex2str(hex) {
    var spacelessStr = hex.split(' ').join('');
    return spacelessStr.match(/.{2}/g).map(function (string) {
        return String.fromCharCode(parseInt(string, 16));
    }).join('');
}

function packBits(data) {
    var output = '',
        i = 0;

    while (i < data.length) {
        var hex = data.charCodeAt(i);

        if (hex == 128) {
            // do nothing
        }
        else if (hex > 128) {
            // Repeated bytes
            hex = 256 - hex;

            for (var j = 0; j <= hex; j++) {
                output += data.charAt(i + 1);
            }

            i++;
        }
        else {
            // Literal bytes
            for (var j = 0; j <= hex; j++) {
                output += data.charAt(i + j + 1);
            }

            i += j;
        }

        i++;
    }

    return output;
}

function compile() {
    var decodedData = packBits(hex2str(input.value));
    result.innerHTML = str2hex(decodedData);
    datalength.innerHTML = "Resulting size: " + decodedData.length();
}

compile();
input.addEventListener('change', compile);
