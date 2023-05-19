/**
 * Factory for creating {@link Project} records.
 */
class ProjectFactory extends DatabaseRecordFactory<Project> {
    
    /**
     * Builds and empty project.
     * 
     * @returns empty project
     */
    public buildEmptyProject(): Project {
        var record = this.emptyRecord();

        record.name = ""

        return record
    }
}