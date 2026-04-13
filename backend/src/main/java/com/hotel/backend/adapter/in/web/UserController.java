package com.hotel.backend.adapter.in.web;

import com.hotel.backend.adapter.in.web.dto.CreateUserRequest;
import com.hotel.backend.adapter.in.web.dto.UpdateUserRequest;
import com.hotel.backend.adapter.in.web.dto.UserResponse;
import com.hotel.backend.application.port.in.user.CreateUserCommand;
import com.hotel.backend.application.port.in.user.GetUsersQuery;
import com.hotel.backend.application.port.in.user.GetUsersUseCase;
import com.hotel.backend.application.port.in.user.ManageUserUseCase;
import com.hotel.backend.application.port.in.user.UpdateUserCommand;
import com.hotel.backend.config.WebAdapter;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.List;
import java.util.Optional;

@WebAdapter
@RequestMapping("/api/users")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class UserController {

    private final GetUsersUseCase getUsersUseCase;
    private final ManageUserUseCase manageUserUseCase;

    @GetMapping
    public List<UserResponse> getUsers(@RequestParam Optional<String> keyword) {
        return getUsersUseCase.getUsers(
                        new GetUsersQuery(keyword.map(String::trim).filter(value -> !value.isBlank()))
                ).stream()
                .map(UserWebMapper::toResponse)
                .toList();
    }

    @GetMapping("/{id}")
    public UserResponse getUserById(@PathVariable Integer id) {
        return UserWebMapper.toResponse(getUsersUseCase.getUserById(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse createUser(@RequestBody @Valid CreateUserRequest request) {
        return UserWebMapper.toResponse(manageUserUseCase.createUser(
                new CreateUserCommand(
                        request.username(),
                        request.password(),
                        request.fullName(),
                        request.position(),
                        request.mail(),
                        request.description()
                )
        ));
    }

    @PutMapping("/{id}")
    public UserResponse updateUser(@PathVariable Integer id, @RequestBody @Valid UpdateUserRequest request) {
        return UserWebMapper.toResponse(manageUserUseCase.updateUser(
                new UpdateUserCommand(
                        id,
                        request.username(),
                        request.fullName(),
                        request.position(),
                        request.mail(),
                        request.description()
                )
        ));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable Integer id, Authentication authentication) {
        manageUserUseCase.deleteUser(id, authentication.getName());
    }
}
