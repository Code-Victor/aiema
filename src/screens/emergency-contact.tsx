import { useEffect } from "react";
import { StyleSheet } from "react-native-unistyles";

import * as Contacts from "expo-contacts";
import * as React from "react";
import { Stack } from "expo-router";
import { YStack } from "@/components/ui/stacks";
import { SearchNormal1 } from "iconsax-react-native";
import { InputWithIcon } from "@/components/ui/input";
import { FlatList, TouchableOpacity } from "react-native";
import { Text } from "@/components/ui/text";
import { useStore } from "@/store";

export default function EmergencyContacts() {
  const [contacts, setContacts] = React.useState<Contacts.Contact[]>([]);
  const emergencyContacts = useStore((s) => s.emergencyContacts);
  const addEmergencyContact = useStore((s) => s.addEmergencyContact);
  const removeEmergencyContact = useStore((s) => s.removeEmergencyContact);
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          // fields: [Contacts.Fields.Emails],
        });

        if (data.length > 0) {
          setContacts(data);
        }
      }
    })();
  }, []);

  const filteredContacts = React.useMemo(() => {
    if (!searchQuery.trim()) return contacts;

    return contacts.filter((contact) => {
      const name = `${contact.firstName || ""} ${
        contact.lastName || ""
      }`.toLowerCase();
      return name.includes(searchQuery.toLowerCase());
    });
  }, [contacts, searchQuery]);

  const toggleContactSelection = (contactId: string) => {
    if (emergencyContacts.some((c) => c.id === contactId)) {
      removeEmergencyContact(contactId);
    } else {
      const contact = contacts.find((c) => c.id === contactId);
      if (contact) {
        addEmergencyContact({
          id: contact.id ?? "",
          name: `${contact.firstName ?? ""} ${contact.lastName ?? ""}`,
          phoneNumber: contact.phoneNumbers?.[0].number ?? "",
        });
      }
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Emergency Contacts",
        }}
      />
      <YStack f="1" style={styles.container}>
        <InputWithIcon
          icon={SearchNormal1}
          variant="filled"
          placeholder="Search contacts"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Text style={styles.selectedCount}>
          {emergencyContacts.length} contact
          {emergencyContacts.length !== 1 ? "s" : ""} selected
        </Text>
        <FlatList
          data={filteredContacts.slice(0, 20)}
          contentContainerStyle={{
            gap: 8,
          }}
          getItemLayout={(data, index) => ({
            length: 72,
            offset: 72 * index + 8 * index,
            index,
          })}
          renderItem={({ item }) => (
            <ContactItem
              {...item}
              selected={emergencyContacts.some((c) => c.id === item.id)}
              onPress={() => toggleContactSelection(item.id ?? "")}
            />
          )}
          keyExtractor={(item, index) => item.id ?? String(index)}
        />
      </YStack>
    </>
  );
}

const ContactItem = React.memo(
  ({
    firstName,
    lastName,
    phoneNumbers,
    selected,
    onPress,
  }: Contacts.Contact & { selected: boolean; onPress: () => void }) => {
    const name = `${firstName ? firstName : ""}${
      lastName ? " " + lastName : ""
    }`;
    const phoneNumber = `${
      (phoneNumbers ?? []).length > 0 ? phoneNumbers?.[0].number : ""
    }`;
    styles.useVariants({
      selected,
    });
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        style={styles.contactItem}
      >
        <Text fos="h6" fow="semibold">
          {name}
        </Text>
        <Text color="neutral.200">{phoneNumber}</Text>
      </TouchableOpacity>
    );
  }
);

ContactItem.displayName = "ContactItem";
const styles = StyleSheet.create((theme, rt) => ({
  container: {
    backgroundColor: theme.colors["shades.white"],
    gap: theme.space(2),
    flex: 1,
    paddingHorizontal: theme.space(5),
  },
  scrollView: {
    paddingHorizontal: theme.space(5),
    gap: theme.space(8),
    paddingBottom: theme.space(5),
  },
  contactItem: {
    height: 72,
    borderRadius: 16,
    padding: theme.space(5),
    variants: {
      selected: {
        true: {
          backgroundColor: theme.colors["secondary.100"],
        },
        false: {
          borderWidth: 1,
          borderColor: theme.colors["background"],
        },
      },
    },
  },
  selectedCount: {
    marginVertical: theme.space(2),
    fontWeight: "bold",
  },
}));
