package ua.nure.diachenko.nra.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import ua.nure.diachenko.nra.data.ResourceRepository
import ua.nure.diachenko.nra.model.MeasurementDraft
import ua.nure.diachenko.nra.model.ResourceType

class ResourceViewModel(
    private val repository: ResourceRepository = ResourceRepository()
) : ViewModel() {
    private val _resources = MutableStateFlow<List<ResourceType>>(emptyList())
    val resources: StateFlow<List<ResourceType>> = _resources

    private val _drafts = MutableStateFlow<List<MeasurementDraft>>(emptyList())
    val drafts: StateFlow<List<MeasurementDraft>> = _drafts

    fun loadResources() {
        viewModelScope.launch {
            _resources.value = repository.loadResourceTypes()
        }
    }

    fun saveMeasurementDraft(draft: MeasurementDraft) {
        repository.saveDraft(draft)
        _drafts.value = repository.getDrafts()
    }

    fun synchronize() {
        viewModelScope.launch {
            repository.synchronizeDrafts()
            _drafts.value = repository.getDrafts()
        }
    }
}
