# File locations
source_dir <- "/path/"
dest_dir <- "/path/"


# Create the destination directory if it doesn't exist
if (!dir.exists(dest_dir)) {
  dir.create(dest_dir, recursive = TRUE)
}

# Get a list of all .png files
files_to_process <- list.files(
  source_dir,
  pattern = "^Item_.*\\.png$",
  full.names = TRUE
)

# Check if any files were found
if (length(files_to_process) == 0) {

  cat("No files matching 'Item_*.png' found in the source directory.")

} else {
  # Loop through each file path
  for (original_path in files_to_process) {
    # Get just the filename
    original_filename <- basename(original_path)
    
    # Remove the "Item_" prefix
    name_without_prefix <- sub("^Item_", "", original_filename)
    
    # Convert the name to lowercase
    final_name <- tolower(name_without_prefix)
    
    # Construct full destination path
    destination_path <- file.path(dest_dir, final_name)
        
    # Copy and rename the files
    file.copy(from = original_path, to = destination_path)

  }
}