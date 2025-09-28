# Configuration
renamed_images_dir <- "/path/"
output_file <- "json_objects.txt"
icon_base_path <- "res/icons/"

# Get all the .png files
filenames <- list.files(renamed_images_dir, pattern = "\\.png$", full.names = FALSE)

# Check if any files were found and stop if the directory is empty
if (length(filenames) == 0) {
    stop("No .png files found in the specified directory. Please check the path.")
}

# Initialize an empty vector
all_json_objects <- c()

# Loop through each filename to build the JSON object string
for (filename in filenames) {

    id_value <- sub("\\.png$", "", filename)
    name_with_spaces <- gsub("_", " ", id_value)
    name_value <- tools::toTitleCase(name_with_spaces)
    icon_value <- paste0(icon_base_path, filename)

    json_template <- 
        '  {
        "id": "%s",
        "name": "%s",
        "category": "*",
        "icon": "%s",
        "recipe": []
        },'
  
    formatted_json <- sprintf(
        json_template,
        id_value,
        name_value,
        icon_value
    )
  
    all_json_objects <- c(all_json_objects, formatted_json)

}

# Write all the generated strings to the output file
writeLines(all_json_objects, output_file)