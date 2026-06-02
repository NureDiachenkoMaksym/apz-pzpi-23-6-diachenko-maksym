package ua.nure.diachenko.nra.data

import ua.nure.diachenko.nra.model.MeasurementDraft
import ua.nure.diachenko.nra.model.ResourceType
import ua.nure.diachenko.nra.model.SyncStatus

class ResourceRepository(
    private val apiClient: ApiClient = ApiClient()
) {
    private val localDrafts = mutableListOf<MeasurementDraft>()

    suspend fun loadResourceTypes(): List<ResourceType> = apiClient.getResourceTypes()

    fun saveDraft(draft: MeasurementDraft) {
        localDrafts.removeAll { it.id == draft.id }
        localDrafts.add(draft.copy(status = SyncStatus.Draft))
    }

    fun getDrafts(): List<MeasurementDraft> = localDrafts.toList()

    suspend fun synchronizeDrafts(): List<MeasurementDraft> {
        val result = mutableListOf<MeasurementDraft>()
        for (draft in localDrafts.toList()) {
            try {
                val synced = apiClient.syncMeasurement(draft.copy(status = SyncStatus.Synced))
                localDrafts.removeAll { it.id == draft.id }
                result.add(synced.copy(status = SyncStatus.Synced))
            } catch (exception: Exception) {
                result.add(draft.copy(status = SyncStatus.Error))
            }
        }
        return result
    }
}
