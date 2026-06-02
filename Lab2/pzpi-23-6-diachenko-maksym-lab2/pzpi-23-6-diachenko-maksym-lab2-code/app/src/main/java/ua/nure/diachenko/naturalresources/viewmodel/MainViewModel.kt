package ua.nure.diachenko.naturalresources.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import ua.nure.diachenko.naturalresources.data.model.DashboardSummary
import ua.nure.diachenko.naturalresources.data.model.ObservationRequest
import ua.nure.diachenko.naturalresources.data.model.ResourceIndicator
import ua.nure.diachenko.naturalresources.data.repository.ResourceRepository

data class MobileUiState(
    val loading: Boolean = false,
    val summary: DashboardSummary? = null,
    val observations: List<ResourceIndicator> = emptyList(),
    val error: String? = null
)

class MainViewModel : ViewModel() {
    private val repository = ResourceRepository()
    private val _state = MutableStateFlow(MobileUiState())
    val state: StateFlow<MobileUiState> = _state

    fun refresh() {
        viewModelScope.launch {
            _state.value = _state.value.copy(loading = true, error = null)
            try {
                val summary = repository.loadDashboard()
                val observations = repository.loadObservations()
                _state.value = MobileUiState(summary = summary, observations = observations)
            } catch (ex: Exception) {
                _state.value = MobileUiState(error = ex.message ?: "Помилка синхронізації")
            }
        }
    }

    fun createDemoObservation() {
        viewModelScope.launch {
            val request = ObservationRequest(
                resourceType = "forest",
                territory = "Харківська область",
                indicatorName = "Лісовий покрив",
                value = 44.8,
                unit = "%",
                latitude = 49.99,
                longitude = 36.23,
                comment = "Польове спостереження з мобільного застосунку"
            )
            repository.sendObservation(request)
            refresh()
        }
    }
}

