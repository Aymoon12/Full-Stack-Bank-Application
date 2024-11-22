package com.bankmanagementsystem.customer;


import com.bankmanagementsystem.account.Account;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.AnyKeyJavaClass;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;




@Getter
@Setter
@Data
@Builder
@Entity
@AllArgsConstructor
@Table(name = "customer")
public class Customer implements UserDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int customer_id;

	@Setter
	@Column(name="user_name")
	private String userName;

	@Setter
	@Column(name="password")
	private String password;


	@Setter
	@Column(name = "name")
	private String name;


	@Setter
	@Column(name ="email")
	private String email;


	@Setter
	@Column(name="phone_number")
	private String phone_number;


	@Column(name="date_of_birth")
	private LocalDate dob;


	@Setter
	@Column(name = "address")
	private String address;

	@CreationTimestamp
	@Column(name = "created_at",updatable = false)
	private LocalDateTime created_at;
//
//	@OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
//	private List<Account> accounts = new ArrayList<>();


	@UpdateTimestamp
	private LocalDateTime updated_at;


	public Customer(String name, String address) {
		this.name = name;
		this.address = address;
	}



	public Customer() {

	}

	public Customer(String name, String email, String phone_number, String address, LocalDate dob, String userName, String password){
		this.name = name;
		this.email = email;
		this.phone_number = phone_number;
		this.address = address;
		this.dob = dob;

		this.password = password;
		this.userName = userName;
	}


	//	public List<Account> getAccounts() {
//		return accounts;
//	}


	@Override
	public String toString() {
		return "Customer{" +
				"userName='" + userName + '\'' +
				", password='" + password + '\'' +
				", name='" + name + '\'' +
				", email='" + email + '\'' +
				", phone_number='" + phone_number + '\'' +
				", dob=" + dob +
				", address='" + address + '\'' +
				'}';
	}


	@Enumerated(EnumType.STRING)
	private Role role;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return List.of(new SimpleGrantedAuthority(role.name()));
	}

	@Override
	public String getUsername() {
		return userName;
	}

	@Override
	public boolean isAccountNonExpired() {
		return UserDetails.super.isAccountNonExpired();
	}

	@Override
	public boolean isAccountNonLocked() {
		return UserDetails.super.isAccountNonLocked();
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return UserDetails.super.isCredentialsNonExpired();
	}

	@Override
	public boolean isEnabled() {
		return UserDetails.super.isEnabled();
	}

	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name="customer_id")
	private List<Account> accounts = new ArrayList<>();

	public void addAccount(Account account) {
		accounts.add(account);
	}


}




