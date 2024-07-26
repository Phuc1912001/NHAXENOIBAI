﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using NhaXeNoiBai.Model.Model;

#nullable disable

namespace NhaXeNoiBai.Model.Migrations
{
    [DbContext(typeof(TranportDBContext))]
    [Migration("20240725105350_doccument")]
    partial class doccument
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("NhaXeNoiBai.Model.Entities.DocumentEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CreateAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("DocumentType")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("DocumentType");

                    b.Property<string>("FileName")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("FileName");

                    b.Property<long?>("FileSize")
                        .HasColumnType("bigint")
                        .HasColumnName("FileSize");

                    b.Property<string>("FileUrl")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("FileUrl");

                    b.Property<Guid?>("FolderId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("FolderId");

                    b.Property<string>("Key")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Key");

                    b.Property<string>("RecordEntity")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("RecordEntity");

                    b.Property<Guid?>("RecordId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("RecordId");

                    b.Property<string>("SubFolder")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("SubFolder");

                    b.Property<Guid?>("SubFolderId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("SubFolderId");

                    b.Property<DateTime>("UpdateAt")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("DocumentEntities");
                });

            modelBuilder.Entity("NhaXeNoiBai.Model.Entities.PriceEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("CarType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CreateAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("FromHanoiToNoiBai")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FromNoiBaiToHanoi")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ToWay")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("UpdateAt")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("PriceEntities");
                });
#pragma warning restore 612, 618
        }
    }
}
