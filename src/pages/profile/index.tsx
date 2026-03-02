import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Tag } from "primereact/tag";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Dialog } from "primereact/dialog";

import { Layout } from "@components/Layout";
import { getValueDate } from "@utils/utils";
import {
  DATE_FORMAT_WITH_HOURS_AND_SECONDS,
  DATE_PARSE_FORMAT_WITH_HOURS_AND_SECONDS,
} from "@utils/date";
import "./style.css";
import { useAuth } from "@contexts/authContext";

type ProfilePageProps = {
  formData: any;
  items: any[] | null | undefined;
  deleteProfile: () => void;
  buildTags: (formData: any) => any[];
  buildAboutRows: (formData: any) => any[];
  EditProvider?: React.ComponentType<React.PropsWithChildren>;
  renderEditForm: (args: {
    close: () => void;
    formData: any;
  }) => React.ReactNode;
  listTitle: string;
  addLabel: string;
  addDialogHeader: string;
  AddProvider?: React.ComponentType<React.PropsWithChildren>;
  renderAddForm: (args: {
    close: () => void;
    formData: any;
  }) => React.ReactNode;
  renderItem: (item: any) => React.ReactNode;
};

export const ProfilePage = ({
  formData,
  items,
  deleteProfile,
  buildTags,
  buildAboutRows,
  EditProvider,
  renderEditForm,
  listTitle,
  addLabel,
  addDialogHeader,
  AddProvider,
  renderAddForm,
  renderItem,
}: ProfilePageProps) => {
  const { perfil } = useAuth();

  const [dialogAdd, setDialogAdd] = useState(false);
  const [dialogEdit, setDialogEdit] = useState(false);

  const isOwnProfile = useMemo(() => {
    const tipoPerfil = perfil?.tipo?.toLowerCase();
    return perfil[tipoPerfil].id === formData?.id;
  }, [perfil, formData?.id]);

  const confirmExcluir = (event: any) => {
    confirmDialog({
      trigger: event.currentTarget,
      message:
        "Você tem certeza que deseja excluir o seu perfil? Esta ação não poderá ser desfeita",
      header: "Excluir Perfil",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Confirmar exclusão",
      accept: () => deleteProfile(),
    });
  };

  const tags = useMemo(() => buildTags(formData) ?? [], [formData, buildTags]);
  const aboutRows = useMemo(
    () => buildAboutRows(formData) ?? [],
    [formData, buildAboutRows]
  );

  const EditWrap = EditProvider ?? React.Fragment;
  const AddWrap = AddProvider ?? React.Fragment;

  return (
    <Layout showFooter headerType="full">
      <div className="profile-container">
        <Card className="profile-card">
          <div className="profile-card-content">
            <div className="profile-avatar">
              <Avatar
                image={formData?.perfil?.foto}
                size="xlarge"
                shape="circle"
              />
            </div>

            <div className="profile-info">
              <div className="profile-text">
                <h1>{formData?.perfil?.nome}</h1>
                <h2>{formData?.perfil?.email}</h2>

                <div className="tags-row">
                  {tags.map((t, idx) => {
                    const content = (
                      <Tag
                        icon={t.icon}
                        value={t.label}
                        rounded
                        style={{ backgroundColor: t.color }}
                      />
                    );

                    return t.href ? (
                      <a
                        key={idx}
                        href={t.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {content}
                      </a>
                    ) : (
                      <React.Fragment key={idx}>{content}</React.Fragment>
                    );
                  })}
                </div>

                <p className="bio-text">{formData?.perfil?.biografia}</p>
              </div>
            </div>

            <div className="profile-buttons">
              <div className="profile-actions">
                {isOwnProfile && (
                  <>
                    <Button
                      label="Editar perfil"
                      icon="pi pi-pencil"
                      style={{
                        background: "var(--Linkedu-Green)",
                        border: "1px solid var(--Linkedu-Green)",
                      }}
                      size="small"
                      onClick={() => setDialogEdit(true)}
                    />

                    {dialogEdit && (
                      <EditWrap>
                        <Dialog
                          header="Editar perfil"
                          visible={dialogEdit}
                          style={{ width: "1200px", maxWidth: "95vw" }}
                          onHide={() => setDialogEdit(false)}
                          draggable={false}
                        >
                          {renderEditForm({
                            close: () => setDialogEdit(false),
                            formData,
                          })}
                        </Dialog>
                      </EditWrap>
                    )}

                    <Button
                      label="Excluir perfil"
                      icon="pi pi-trash"
                      style={{
                        background: "var(--Linkedu-Red)",
                        border: "1px solid var(--Linkedu-Red)",
                      }}
                      size="small"
                      onClick={confirmExcluir}
                    />

                    <ConfirmDialog />
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="bio-update">
            <span className="last-update">
              Última atualização:
              {getValueDate(
                formData?.perfil?.ultimoAcesso,
                DATE_FORMAT_WITH_HOURS_AND_SECONDS,
                DATE_PARSE_FORMAT_WITH_HOURS_AND_SECONDS
              )}
            </span>
          </div>
        </Card>

        <Card className="profile-card">
          <h3>Sobre</h3>
          <div className="about-grid">
            {aboutRows.map((row, idx) => (
              <div key={idx} className="about-item">
                <Avatar
                  icon={row.icon}
                  shape="circle"
                  className="avatar-about"
                />
                <div className="about-line">
                  {row.body ? (
                    row.body
                  ) : (
                    <>
                      <strong>{row.label}</strong>
                      <span>{row.value}</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Divider />

        <div className="exp-header">
          <h3>{listTitle}</h3>
          {isOwnProfile && (
            <Button
              label={addLabel}
              icon="pi pi-plus"
              className="exp-button"
              size="small"
              onClick={() => setDialogAdd(true)}
            />
          )}
          {dialogAdd && (
            <AddWrap>
              <Dialog
                header={addDialogHeader}
                visible={dialogAdd}
                style={{ width: "1200px", maxWidth: "95vw" }}
                onHide={() => setDialogAdd(false)}
                draggable={false}
              >
                {renderAddForm({
                  close: () => setDialogAdd(false),
                  formData,
                })}
              </Dialog>
            </AddWrap>
          )}
        </div>

        <div className="exp-list">
          {items && items.length > 0 ? (
            items.map((it, idx) => (
              <React.Fragment key={idx}>{renderItem(it)}</React.Fragment>
            ))
          ) : (
            <p className="bio-text">Nenhum item cadastrado</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
