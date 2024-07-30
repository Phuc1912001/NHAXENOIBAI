using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NhaXeNoiBai.Model.Migrations
{
    public partial class discountCodeupdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DiscountNumber",
                table: "DiscountEntities",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DiscountCodeNumber",
                table: "DiscountCodeEntities",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DiscountNumber",
                table: "DiscountEntities");

            migrationBuilder.DropColumn(
                name: "DiscountCodeNumber",
                table: "DiscountCodeEntities");
        }
    }
}
