#!/bin/bash

# Fetch the webpage
curl -s https://biblehub.com/interlinear/genesis/2.htm -o genesis2.html

# Extract relevant data using xmllint
extract_data() {
    local verse_start=$1
    local verse_end=$2
    local output=""

    for (( i=verse_start; i<=verse_end; i++ )); do
        words=$(xmllint --html --xpath "//tr[@data-verse='$i']//td[@class='strongs']/span[@class='eng']" genesis2.html 2>/dev/null | sed -e 's/<[^>]*>//g' | sed -e 's/^[ \t]*//' | tr '\n' ' ')
        en_translit=$(xmllint --html --xpath "//tr[@data-verse='$i']//td[@class='translit']" genesis2.html 2>/dev/null | sed -e 's/<[^>]*>//g' | sed -e 's/^[ \t]*//' | tr '\n' ' ')
        he=$(xmllint --html --xpath "//tr[@data-verse='$i']//td[@class='hb']" genesis2.html 2>/dev/null | sed -e 's/<[^>]*>//g' | sed -e 's/^[ \t]*//' | tr '\n' ' ')

        output+="{ \"type\": \"p\", \"verse\": $i, \"words\": ["

        IFS=' ' read -r -a words_array <<< "$words"
        IFS=' ' read -r -a en_translit_array <<< "$en_translit"
        IFS=' ' read -r -a he_array <<< "$he"

        for (( j=0; j<${#words_array[@]}; j++ )); do
            output+="{ \"en\": \"${words_array[j]}\", \"en-translit\": \"${en_translit_array[j]}\", \"he\": \"${he_array[j]}\" },"
        done

        output=${output%,} # Remove trailing comma
        output+="] },"
    done

    output=${output%,} # Remove trailing comma
    echo "$output"
}

# Generate JSON data
json_data=$(cat <<EOF
{
  "book": "Genesis",
  "chapters": [
    {
      "chapter": 2,
      "verses": [
        $(extract_data 1 25)
      ]
    }
  ]
}
EOF
)

# Output JSON data
echo "$json_data" > genesis2.json
echo "Genesis 2 data has been written to genesis2.json"
