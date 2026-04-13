package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.model.HotelProfile;
import com.hotel.backend.application.port.in.UpdateHotelProfileCommand;
import com.hotel.backend.application.port.out.LoadHotelProfilePort;
import com.hotel.backend.application.port.out.SaveHotelProfilePort;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UpdateHotelProfileServiceTest {

    @Mock
    private LoadHotelProfilePort loadHotelProfilePort;

    @Mock
    private SaveHotelProfilePort saveHotelProfilePort;

    @InjectMocks
    private UpdateHotelProfileService updateHotelProfileService;

    @Test
    void updateProfileValidatesStarLevel() {
        when(loadHotelProfilePort.loadCurrentHotel()).thenReturn(Optional.of(sampleHotel()));

        assertThatThrownBy(() -> updateHotelProfileService.updateProfile(new UpdateHotelProfileCommand(
                "Sunrise Hotel",
                6,
                "123 Nguyen Hue",
                "Main property"
        )))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("starLevel must be between 1 and 5");
    }

    @Test
    void updateProfileSavesNormalizedValues() {
        when(loadHotelProfilePort.loadCurrentHotel()).thenReturn(Optional.of(sampleHotel()));
        when(saveHotelProfilePort.saveHotel(new HotelProfile(
                1,
                "Sunrise Hotel Central",
                5,
                "456 Le Loi, District 1",
                "Updated property profile"
        ))).thenReturn(new HotelProfile(
                1,
                "Sunrise Hotel Central",
                5,
                "456 Le Loi, District 1",
                "Updated property profile"
        ));

        HotelProfile updated = updateHotelProfileService.updateProfile(new UpdateHotelProfileCommand(
                "  Sunrise Hotel Central  ",
                5,
                " 456 Le Loi, District 1 ",
                " Updated property profile "
        ));

        assertThat(updated.name()).isEqualTo("Sunrise Hotel Central");
        assertThat(updated.address()).isEqualTo("456 Le Loi, District 1");
        verify(saveHotelProfilePort).saveHotel(new HotelProfile(
                1,
                "Sunrise Hotel Central",
                5,
                "456 Le Loi, District 1",
                "Updated property profile"
        ));
    }

    private HotelProfile sampleHotel() {
        return new HotelProfile(1, "Sunrise Hotel", 4, "123 Nguyen Hue", "Main local development hotel");
    }
}
